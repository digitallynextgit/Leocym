import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/content/site";

/**
 * POST /api/enquiry — the business enquiry and contact form.
 *
 * Sitemap Part C, item 7 · Marketing Strategy §6.3 item 4: "a business enquiry
 * and contact form, so business customers can reach out."
 *
 * Design notes worth keeping:
 *
 *   - It sends mail over SMTP and nothing else. No CRM, no database, no queue.
 *     The strategy (§14.9) routes leads through people, not software, so the
 *     honest implementation is one that puts a well-formed email in the inbox
 *     that already handles them.
 *   - The reader's address goes in Reply-To, never in From. Sending as the
 *     enquirer fails SPF and DMARC at the recipient and quietly lands the whole
 *     lead flow in spam. From is always our own authenticated sender.
 *   - Everything is escaped before it reaches the HTML body. A form that will
 *     be read in a mail client by a salesperson is still an injection surface.
 *   - Misconfiguration returns 503 with a plain instruction, not 500 with a
 *     stack trace. The most likely failure on day one is an unset variable, and
 *     that should be legible to whoever is wiring up Vercel.
 *
 * Nothing here is cached, and nothing here is prerendered.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* -------------------------------------------------------------- the shape  */

type Field = {
  key: string;
  label: string;
  required?: boolean;
  max: number;
};

/** Kept in sync with the form in components/sections/EnquiryForm.tsx. */
const FIELDS: Field[] = [
  { key: "name", label: "Name", required: true, max: 120 },
  { key: "email", label: "Email", required: true, max: 200 },
  { key: "organisation", label: "Organisation", max: 160 },
  { key: "phone", label: "Phone", max: 40 },
  { key: "city", label: "City", max: 120 },
  { key: "enquiryType", label: "Enquiry type", required: true, max: 60 },
  { key: "site", label: "Where the smell is", max: 200 },
  { key: "tried", label: "What has been tried", max: 400 },
  { key: "message", label: "Message", required: true, max: 4000 },
];

/** Mirrors the radio group on the form. Anything else is rejected. */
const ENQUIRY_TYPES = new Set([
  "Business or facility",
  "Industrial or municipal site",
  "Documentation request",
  "Home use",
  "Something else",
]);

/* Deliberately permissive. An address rejected by a clever regex that the mail
   server would have accepted is a lead thrown away, and the only real proof an
   address works is a reply arriving. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------ rate limiting */

/**
 * A per-instance sliding window. On a serverless platform each instance keeps
 * its own copy, so this is a speed bump for casual abuse rather than a real
 * limiter — the honeypot below stops far more. If enquiry volume ever justifies
 * it, this is the function to replace with a shared store, and nothing else
 * needs to change.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ output */

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Header injection: a newline in a subject or a name splits the message. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function render(values: Record<string, string>) {
  const rows = FIELDS.filter((f) => values[f.key]).map(
    (f) => [f.label, values[f.key]] as const,
  );

  const text = rows.map(([label, v]) => `${label}:\n${v}`).join("\n\n");

  const html = `<table style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1c1c46">
${rows
  .map(
    ([label, v]) =>
      `<tr><th align="left" valign="top" style="padding:8px 20px 8px 0;border-bottom:1px solid #d4d4e0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5e608e;white-space:nowrap">${escape(
        label,
      )}</th><td valign="top" style="padding:8px 0;border-bottom:1px solid #d4d4e0;white-space:pre-wrap">${escape(
        v,
      )}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin-top:24px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5e608e">Sent from the enquiry form on ${escape(
    SITE.url,
  )}</p>`;

  return { text, html };
}

/* -------------------------------------------------------------------- POST */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read that submission." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, error: "Could not read that submission." },
      { status: 400 },
    );
  }
  const raw = body as Record<string, unknown>;

  /* ---- The honeypot. A field hidden from people and irresistible to bots.
          A filled one is answered with a cheerful 200 and dropped on the floor,
          because telling a bot it failed only teaches it to try again. ---- */
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: `That is several enquiries in a short time. Write to ${SITE.contact.email} and we will pick it up there.`,
      },
      { status: 429 },
    );
  }

  /* ---- Validate ---- */
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const field of FIELDS) {
    const v = typeof raw[field.key] === "string" ? (raw[field.key] as string) : "";
    const trimmed = v.trim();

    if (field.required && !trimmed) {
      errors[field.key] = `${field.label} is required.`;
      continue;
    }
    if (trimmed.length > field.max) {
      errors[field.key] = `${field.label} is longer than we can accept.`;
      continue;
    }
    if (trimmed) values[field.key] = trimmed;
  }

  if (values.email && !EMAIL.test(values.email)) {
    errors.email = "That email address does not look complete.";
  }
  if (values.enquiryType && !ENQUIRY_TYPES.has(values.enquiryType)) {
    errors.enquiryType = "Choose one of the listed enquiry types.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Some fields need another look.", fields: errors },
      { status: 422 },
    );
  }

  /* ---- Configuration ---- */
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.ENQUIRY_TO || SITE.contact.email;
  const from = process.env.ENQUIRY_FROM || user;

  if (!host || !user || !pass || !from) {
    // Log for the operator; say something useful to the reader. Never echo the
    // variable values, only which names are missing.
    console.error(
      "[enquiry] SMTP is not configured. Missing:",
      [
        !host && "SMTP_HOST",
        !user && "SMTP_USER",
        !pass && "SMTP_PASS",
        !from && "ENQUIRY_FROM",
      ]
        .filter(Boolean)
        .join(", "),
    );
    return NextResponse.json(
      {
        ok: false,
        error: `The form is not connected yet. Please write to ${SITE.contact.email} and we will reply the same way.`,
      },
      { status: 503 },
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    // Implicit TLS on 465; STARTTLS on 587 and 25. Overridable for a provider
    // that does something unusual.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: { user, pass },
  });

  const { text, html } = render(values);
  const subject = oneLine(
    `Enquiry — ${values.enquiryType} — ${values.name}${
      values.organisation ? ` (${values.organisation})` : ""
    }`,
  );

  try {
    await transport.sendMail({
      from: { name: `${SITE.name} website`, address: from },
      to,
      // The salesperson hits reply and it goes to the enquirer, not to us.
      replyTo: { name: oneLine(values.name), address: values.email },
      subject,
      text,
      html,
    });
  } catch (err) {
    // The message body carries the enquirer's details, so it is never logged.
    console.error(
      "[enquiry] SMTP send failed:",
      err instanceof Error ? err.message : "unknown error",
    );
    return NextResponse.json(
      {
        ok: false,
        error: `We could not send that just now. Please write to ${SITE.contact.email} instead — it reaches the same people.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
