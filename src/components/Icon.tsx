/**
 * The Leocym icon set.
 *
 * Drawn for this project rather than pulled from Lucide or Heroicons. A stock
 * set in a tinted rounded square is one of the most recognisable generated-UI
 * tells there is, and it would undo the work the rest of the design does.
 *
 * House style, so they read as one family:
 *   - 24x24 box, 1.5 stroke, round caps and joins, no fill
 *   - currentColor throughout, so they inherit the surrounding text colour
 *   - geometric and calm, matching the Petal motif's line weight
 */

export type IconName =
  // delivery
  | "poured"
  | "sprayed"
  | "evaporated"
  | "airflow"
  // method
  | "identify"
  | "diagnose"
  | "customise"
  | "implement"
  | "monitor"
  | "maintain"
  // industrial
  | "water"
  | "waste"
  | "decontamination"
  | "industry"
  | "emissions"
  // areas
  | "workplace"
  | "hospitality"
  | "transport"
  | "residential";

const PATHS: Record<IconName, React.ReactNode> = {
  /* ---------------------------------------------------------- delivery */
  // a droplet falling into a drain grating
  poured: (
    <>
      <path d="M12 2.5c0 0-4 4.9-4 7.6a4 4 0 0 0 8 0c0-2.7-4-7.6-4-7.6Z" />
      <path d="M4.5 17.5h15" />
      <path d="M6.5 21h11" />
    </>
  ),
  // a nozzle throwing a fan of droplets
  sprayed: (
    <>
      <path d="M13.5 6.5h4.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
      <path d="M13.5 4.5h3" />
      <path d="M8 7.5 4 5.5M7.5 11H3M8 14.5 4 16.5" />
    </>
  ),
  // an open vessel with vapour rising
  evaporated: (
    <>
      <path d="M6 12.5h12v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-5Z" />
      <path d="M5 12.5h14" />
      <path d="M9 8.5c0-1.5 1.5-1.5 1.5-3M14 8.5c0-1.5 1.5-1.5 1.5-3" />
    </>
  ),
  // air moving through a vent
  airflow: (
    <>
      <path d="M3 8.5h11a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 17.5h7" />
    </>
  ),

  /* ------------------------------------------------------------ method */
  identify: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  diagnose: (
    <>
      <path d="M9.5 3v6.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3l-4.7-8.8V3" />
      <path d="M8 3h8" />
      <path d="M7.2 14.5h9.6" />
    </>
  ),
  customise: (
    <>
      <path d="M3 7h11M18 7h3M3 17h4M11 17h10" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="9" cy="17" r="2.2" />
    </>
  ),
  implement: (
    <>
      <path d="M10 8h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
      <path d="M11 8V5.5A1.5 1.5 0 0 1 12.5 4h1" />
      <path d="M18 11.5h2.5" />
      <path d="M11.5 13h3" />
    </>
  ),
  monitor: (
    <>
      <path d="M3 20h18" />
      <path d="m4 15.5 4.5-5 3.5 3 4-6.5 4 4" />
      <circle cx="8.5" cy="10.5" r="1" />
      <circle cx="16" cy="7" r="1" />
    </>
  ),
  maintain: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 4v4.5H16" />
    </>
  ),

  /* -------------------------------------------------------- industrial */
  // a treatment basin, seen in section, with water
  water: (
    <>
      <path d="M3.5 9.5h17v6.5a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4V9.5Z" />
      <path d="M3.5 13.2c1.6 0 1.6 1.6 3.2 1.6s1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6 1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6" />
      <path d="M7 9.5V6M17 9.5V6" />
    </>
  ),
  // a tipped mound of waste
  waste: (
    <>
      <path d="M2.5 20h19" />
      <path d="M4.5 20c1.5-5 4-8 7.5-8s6 3 7.5 8" />
      <path d="M9 12.5 7.5 8.5M13.5 11.8 15.5 7.5" />
    </>
  ),
  // ground being treated: a shield over strata
  decontamination: (
    <>
      <path d="M12 3.2 19 6v5.2c0 4.2-2.9 7.3-7 9.6-4.1-2.3-7-5.4-7-9.6V6l7-2.8Z" />
      <path d="M8.5 12.5h7" />
      <path d="M12 8.5c0 0-2 2.4-2 3.7a2 2 0 0 0 4 0c0-1.3-2-3.7-2-3.7Z" />
    </>
  ),
  // plant with stacks
  industry: (
    <>
      <path d="M2.5 20.5h19" />
      <path d="M3.5 20.5V11l6 3.5V11l6 3.5V6.5h5v14" />
      <path d="M6.5 17.5h1M12.5 17.5h1M18 17.5h1" />
    </>
  ),
  // a stack releasing a plume
  emissions: (
    <>
      <path d="M6.5 20.5V9.5h4v11" />
      <path d="M3.5 20.5h17" />
      <path d="M13.5 8.5a2.5 2.5 0 0 1 4.6-1.3A2.2 2.2 0 0 1 20.5 11h-6a2 2 0 0 1-1-2.5Z" />
      <path d="M7.5 6.5h2" />
    </>
  ),

  /* ------------------------------------------------------------- areas */
  workplace: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M5.5 20.5v-16h9v16" />
      <path d="M14.5 9.5h4v11" />
      <path d="M8 8h1.5M11 8h1.5M8 12h1.5M11 12h1.5M8 16h1.5M11 16h1.5" />
    </>
  ),
  hospitality: (
    <>
      <path d="M3.5 17.5h13a4 4 0 0 0 4-4h-17v4Z" />
      <path d="M4.5 20.5h11" />
      <path d="M8 9.5c0-1.4 1.4-1.4 1.4-2.8M12 9.5c0-1.4 1.4-1.4 1.4-2.8" />
    </>
  ),
  transport: (
    <>
      <path d="M6.5 3.5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z" />
      <path d="M4.5 9.5h15" />
      <path d="M8 13.5h.01M16 13.5h.01" />
      <path d="m7.5 17.5-2 3M16.5 17.5l2 3" />
    </>
  ),
  residential: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 12.5v8h13v-8" />
      <path d="M10 20.5v-5h4v5" />
    </>
  ),
};

export function Icon({
  name,
  size = 22,
  className = "",
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * France, drawn as a simplified outline with Douai marked.
 *
 * A flag would say "French brand" and stop there. The map says where — which is
 * the actual point of the Origin section, and it earns the space a flag would
 * waste.
 */
export function FranceMap({
  className = "",
  markerClassName = "",
  pulse = true,
}: {
  className?: string;
  markerClassName?: string;
  /** The ring around Douai repeats outward, the way a place marker does on
      every map interface a reader has ever used. It is the one thing on this
      drawing that says "here", so it is the one thing that moves. */
  pulse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Map of France with Douai marked in the far north"
    >
      {/*
        Mainland, traced clockwise from Dunkirk. The recognisable features are
        what make it read as France rather than a blob, so they are kept even at
        this simplification: the Brittany peninsula reaching west, the Cotentin
        stub above Normandy, the straight Pyrenean border, and the Riviera
        corner. Everything else is smoothed away.
      */}
      <path
        d="M62 6 L72 12 L86 22 L83 32 L88 42 L92 52 L95 62
           L86 67 L76 70 L69 72 L57 74 L49 80 L38 78 L28 76 L22 71
           L18 62 L16 50 L14 41 L6 37 L0 31 L9 27 L19 26
           L24 18 L29 26 L37 20 L45 14 L53 9 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Corsica */}
      <path
        d="M92 79 L96 84 L95 93 L91 96 L89 88 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Douai — far north, near the Belgian border. Sits INSIDE the outline,
          not on it, so it reads as a place rather than a border marker. */}
      <g className={markerClassName}>
        <circle cx="62" cy="16" r="3.4" fill="currentColor" />
        <circle
          cx="62"
          cy="16"
          r="7.5"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.4"
          /* transform-box/origin come with the utility, so the ring expands
             from the marker rather than from the corner of the viewBox. */
          className={pulse ? "ping-slow" : ""}
        />
      </g>
    </svg>
  );
}
