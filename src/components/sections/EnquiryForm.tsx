"use client";

import { useId, useState } from "react";
import { SITE } from "@/content/site";
import { Petal, Stagger } from "@/components/ui";

/**
 * The business enquiry and contact form — sitemap Part C, item 7.
 *
 * Written as a real HTML form and progressively enhanced, not as a pile of
 * controlled inputs: it has a `method` and an `action`, every field has a real
 * `<label>`, and the browser's own validation runs first. JavaScript intercepts
 * the submit to post JSON so the reader stays on the page.
 *
 * Three things this deliberately does NOT do:
 *
 *   - No field is marked optional-but-styled-as-required. The four things we
 *     genuinely need are marked; everything else says so.
 *   - No live validation while typing. Being corrected mid-word is the single
 *     most disliked form behaviour there is; errors arrive on submit, attached
 *     to the field, and focus moves to the first one.
 *   - No fake success. If the send fails the reader is told, and given the
 *     email address that reaches exactly the same people.
 */

const ENQUIRY_TYPES = [
  {
    value: "Business or facility",
    hint: "Offices, hotels, hospitals, food businesses, facility management",
  },
  {
    value: "Industrial or municipal site",
    hint: "Waste water, landfill, decontamination, heavy industry",
  },
  {
    value: "Documentation request",
    hint: "Safety data sheets, composition, certificates, technical data",
  },
  { value: "Home use", hint: "A smell at home you have not been able to shift" },
  { value: "Something else", hint: "" },
];

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; fields?: Record<string, string> };

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const fieldErrors = status.state === "error" ? (status.fields ?? {}) : {};
  const sending = status.state === "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (res.ok && data.ok) {
        setStatus({ state: "sent" });
        form.reset();
        return;
      }

      setStatus({
        state: "error",
        message:
          data.error ??
          `Something went wrong at our end. Please write to ${SITE.contact.email}.`,
        fields: data.fields,
      });

      // Send focus to the first field the server rejected, so a keyboard or
      // screen-reader user is put where the problem is rather than being told
      // there is one somewhere above.
      const first = data.fields && Object.keys(data.fields)[0];
      if (first) {
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
    } catch {
      setStatus({
        state: "error",
        message: `We could not reach the server. Please check your connection, or write to ${SITE.contact.email}.`,
      });
    }
  }

  if (status.state === "sent") {
    /* The confirmation is the one moment on the site where an entrance is
       carrying relief rather than composition, so it gets a slightly longer
       step than anything else: the ornament draws itself, then the sentence
       arrives. `data-shown` is set directly because this element only exists
       once the send has succeeded - there is nothing to wait for. */
    return (
      <div
        data-stagger
        data-shown
        style={{ "--stagger-step": "110ms" } as React.CSSProperties}
        className="rule-all rounded-photo bg-paper-2 p-8 sm:p-12"
      >
        <Petal size={40} className="text-clean-deep" />
        <h2 className="display-2 mt-6">That has reached us.</h2>
        <p className="prose-lead text-ink-deep/80 measure-text mt-4">
          A person reads these, not an autoresponder, so the reply will make
          sense. If it is urgent, or if you would rather attach photographs of
          the site, write to{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4"
          >
            {SITE.contact.email}
          </a>{" "}
          and it lands in the same place.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="ui-text rule-all text-ink hover:bg-ink hover:text-paper mt-8 inline-flex px-6 py-3 transition-colors duration-(--dur-quick)"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      /* A real action, so the form is meaningful before hydration and to any
         tooling that reads the markup. The submit handler intercepts it. */
      action="/api/enquiry"
      method="post"
      onSubmit={onSubmit}
      noValidate={false}
      className="rule-all rounded-photo bg-paper-2 p-6 sm:p-9"
    >
      {/* ---- Honeypot. Hidden from people, offered to bots. `hidden` rather
              than an off-screen field, so a screen reader never announces it,
              and autocomplete is switched off so a password manager does not
              helpfully fill it in. ---- */}
      <div hidden aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ---- Who ---- */}
      <fieldset disabled={sending} className="border-0 p-0">
        <legend className="spec-label text-flame-deep">Who you are</legend>

        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          <Field
            id={id("name")}
            name="name"
            label="Name"
            required
            autoComplete="name"
            error={fieldErrors.name}
          />
          <Field
            id={id("email")}
            name="email"
            type="email"
            label="Email"
            required
            autoComplete="email"
            error={fieldErrors.email}
          />
          <Field
            id={id("organisation")}
            name="organisation"
            label="Organisation"
            hint="If you are writing on behalf of one"
            autoComplete="organization"
            error={fieldErrors.organisation}
          />
          <Field
            id={id("phone")}
            name="phone"
            type="tel"
            label="Phone"
            hint="Only if you would rather be called"
            autoComplete="tel"
            error={fieldErrors.phone}
          />
          <Field
            id={id("city")}
            name="city"
            label="City"
            autoComplete="address-level2"
            error={fieldErrors.city}
          />
        </div>
      </fieldset>

      {/* ---- What kind ---- */}
      <fieldset disabled={sending} className="rule-t mt-9 border-0 p-0 pt-7">
        <legend className="spec-label text-flame-deep">
          What this is about
        </legend>
        <p className="prose-body text-ink-soft mt-2">
          It decides who reads it first.
        </p>

        <Stagger step={55} className="mt-4">
          {ENQUIRY_TYPES.map((t, i) => (
            <label
              key={t.value}
              className="rule-b hover:bg-paper-3/50 -mx-3 flex cursor-pointer items-start gap-3.5 px-3 py-3 transition-colors duration-(--dur-quick)"
            >
              <input
                type="radio"
                name="enquiryType"
                value={t.value}
                defaultChecked={i === 0}
                required
                className="accent-flame mt-1 h-4 w-4 shrink-0"
              />
              <span>
                <span className="ui-text block">{t.value}</span>
                {t.hint ? (
                  <span className="prose-body text-ink-soft mt-0.5 block">
                    {t.hint}
                  </span>
                ) : null}
              </span>
            </label>
          ))}
        </Stagger>
        {fieldErrors.enquiryType ? (
          <p className="spec-value text-odour-deep mt-2">
            {fieldErrors.enquiryType}
          </p>
        ) : null}
      </fieldset>

      {/* ---- The problem ----
              These three questions are the ones the team asks back on almost
              every enquiry. Asking them here saves a round trip. */}
      <fieldset disabled={sending} className="rule-t mt-9 border-0 p-0 pt-7">
        <legend className="spec-label text-flame-deep">The problem</legend>

        {/* Explicitly two columns. It rendered as two before this was declared,
            but only by accident: the message field's `sm:col-span-2` was forcing
            an implicit second column into a grid that had never been told how
            many to have. That works until the day the message field moves. */}
        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          <Field
            id={id("site")}
            name="site"
            label="Where the smell is"
            hint="A drain, a washroom, a kitchen, a car, a whole site"
            error={fieldErrors.site}
          />
          <Field
            id={id("tried")}
            name="tried"
            label="What has been tried"
            hint="Usually a fragrance. Knowing what failed narrows it quickly"
            error={fieldErrors.tried}
          />
          <Field
            id={id("message")}
            name="message"
            label="Your message"
            required
            textarea
            hint="How long it has been there, how large the area is, and anything it has to pass"
            error={fieldErrors.message}
          />
        </div>
      </fieldset>

      {/* ---- Submit ---- */}
      <div className="rule-t mt-9 flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="prose-body text-ink-soft max-w-[38ch]">
          Your details are used to answer this enquiry. Nothing here is sold,
          and there is no mailing list attached to this form.
        </p>
        <button
          type="submit"
          disabled={sending}
          style={
            { "--fill": "var(--color-flame-deep)" } as React.CSSProperties
          }
          className="ui-text fill-rise bg-flame text-ink hover:text-paper inline-flex shrink-0 items-center justify-center gap-3 px-7 py-3.5 transition-colors duration-(--dur-base) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send enquiry"}
          {/* A real indeterminate indicator, not a disabled button that looks
              broken. It replaces the arrow, so the button never changes width
              mid-send and the row does not reflow under the cursor. */}
          <span
            aria-hidden="true"
            className={`block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-current ${
              sending ? "spin-quick border-t-transparent" : "border-transparent"
            }`}
          />
        </button>
      </div>

      {/* One live region for the whole form, so a status change is announced
          once rather than field by field. */}
      <p aria-live="polite" className="sr-only">
        {sending ? "Sending your enquiry." : ""}
      </p>

      {status.state === "error" ? (
        <p
          role="alert"
          className="border-odour bg-odour-pale text-ink-deep prose-body mt-6 border-l-2 px-5 py-4"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * One field, one shape. The hint is wired through `aria-describedby` rather
 * than left as loose text under the input, and the error joins the same
 * description so it is read out with the field instead of being seen only by
 * people who can look up.
 */
function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  hint,
  error,
  textarea = false,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control =
    "ui-text bg-paper text-ink-deep placeholder:text-ink-soft mt-2 block w-full rounded-sm border px-3.5 py-2.5 transition-colors duration-(--dur-quick) focus:border-flame focus:outline-none";
  const border = error
    ? "border-odour"
    : "border-ink-faint hover:border-ink-soft";

  return (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="spec-label text-ink-deep block">
        {label}
        {required ? (
          <span className="text-flame-deep ml-1.5" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-ink-soft ml-2 lowercase tracking-normal">
            optional
          </span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={5}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${control} ${border} scroll-slim resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${control} ${border}`}
        />
      )}

      {hint ? (
        <p id={hintId} className="prose-body text-ink-soft mt-1.5">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="spec-value text-odour-deep mt-1.5">
          {error}
        </p>
      ) : null}
    </div>
  );
}
