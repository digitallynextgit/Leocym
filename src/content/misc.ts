/**
 * Method, areas of use, and Q&A.
 * Sources: Leocym product catalogue pages 3 and 4; Marketing Strategy §1.9.
 */

/* ---------------------------------------------------------------- METHOD  */
/* Catalogue p.3 - the six-step odour control procedure. This is what makes
   Leocym a system rather than a bottle, and it is what earns B2B trust. */

import type { IconName } from "@/components/Icon";

export type Step = { n: string; title: string; body: string; icon: IconName };

export const PROCEDURE: Step[] = [
  {
    n: "01",
    title: "Identify",
    icon: "identify",
    body: "Identify the odour source through a detailed site assessment.",
  },
  {
    n: "02",
    title: "Diagnose",
    icon: "diagnose",
    body: "Diagnose the issue by testing existing odour control products.",
  },
  {
    n: "03",
    title: "Customise",
    icon: "customise",
    body: "Customise Leocym solutions to the environment and the severity.",
  },
  {
    n: "04",
    title: "Implement",
    icon: "implement",
    body: "Implement the selected products and engineering interventions.",
  },
  {
    n: "05",
    title: "Monitor",
    icon: "monitor",
    body: "Monitor performance to track effectiveness and ensure consistency.",
  },
  {
    n: "06",
    title: "Maintain",
    icon: "maintain",
    body: "Maintain systems regularly to ensure lasting odour control.",
  },
];

/* ------------------------------------------------------------ AREAS OF USE */
/* Catalogue p.4 - 27 environments. Grouped here for legibility; the catalogue
   lists them as one run. */

export const AREAS: { group: string; items: string[]; icon: IconName }[] = [
  {
    group: "Workplaces",
    icon: "workplace",
    items: [
      "Offices",
      "Corporate offices",
      "Business parks",
      "Coworking spaces",
      "Government offices",
      "Embassies",
      "Commercial buildings",
      "Facility management companies",
    ],
  },
  {
    group: "Hospitality & leisure",
    icon: "hospitality",
    items: [
      "Hotels",
      "Restaurants",
      "Cafés",
      "Banquet halls",
      "Malls",
      "Multiplexes",
      "Exhibition halls",
      "Gyms",
    ],
  },
  {
    group: "Public & transport",
    icon: "transport",
    items: [
      "Airports",
      "Airplanes",
      "Trains",
      "Railways",
      "Public areas",
      "Hospitals",
    ],
  },
  {
    group: "Education & residential",
    icon: "residential",
    items: [
      "Schools",
      "Colleges",
      "Universities",
      "Residential societies",
      "Households",
    ],
  },
];

export const AREAS_COUNT = AREAS.reduce((n, g) => n + g.items.length, 0);

/* ------------------------------------------------------------------- Q&A  */
/* AEO / GEO engine (Marketing Strategy §1.9). These are written to match how
   people actually search - the problem, in plain words - and are rendered with
   FAQPage structured data so they can be quoted directly by answer engines.

   Every answer here stays inside the approved claims. No numbers, no
   percentages, no comparisons to named competitors. */

export type QA = { q: string; a: string };

export const FAQ: QA[] = [
  {
    q: "What is the difference between an odour neutraliser and an air freshener?",
    a: "An air freshener adds a fragrance on top of a bad smell. The source of the smell is still there, so once the fragrance fades the smell returns. An odour neutraliser works on the odour itself, acting on the compound at its source rather than covering it. That is the difference between masking and removing.",
  },
  {
    q: "Why does my drain still smell even after I clean it?",
    a: "Cleaning removes what you can see. Drain odour usually comes from organic matter decomposing further down the pipe, out of reach of surface cleaning, so the smell keeps returning. Drain Odrkill is formulated for the olfactory nuisance emanating from drains and is poured directly into the drain, which is where the source actually sits.",
  },
  {
    q: "Does Leocym just cover up smells with perfume?",
    a: "No. Leocym products remove smells at the source, rather than masking them with fragrance. Some products also carry a fragrance, but the fragrance is not what does the work - the neutralising action is.",
  },
  {
    q: "Where does Leocym come from?",
    a: "Leocym is a French company headquartered in Douai, France. The technology has been used and trusted across Europe, and is now available in India for the first time.",
  },
  {
    q: "Can Leocym products be used at home as well as in businesses?",
    a: "Yes. The range is designed for both. The same formulations are used in corporate offices, hotels, hospitals and food businesses, and in ordinary households. Open any product in the range above to see the environments it suits.",
  },
  {
    q: "Are Leocym products safe and eco-friendly?",
    a: "The cleaning range is made predominantly of ingredients of plant and mineral origin, with the exact proportion printed on each product. Products carry usage, precaution and safety information on the pack, and should be used as directed.",
  },
  {
    q: "What can be done about odour from a landfill, treatment plant or industrial site?",
    a: "Large-scale odour is treated with the same neutralising chemistry, delivered by different equipment - high-pressure spray rails, gel plate ramps, portable sprayers, and spray cannons with a reach of up to 400 metres. Leocym works with waste water networks, landfills, composting sites, refineries, metro tunnelling and heavy industry.",
  },
  {
    q: "How do I choose the right product for my smell?",
    a: "Start from the problem, not the product. The range is built around specific sources - drains, urine, garbage, smoke, carpets, meat, fish, paint - because each odour behaves differently. If the source is unclear, the six-step method begins with identifying it through a site assessment.",
  },
  {
    q: "How is Leocym applied?",
    a: "It depends on where the odour is produced. Liquids are poured directly into drains or sprayed onto the soiled surface. Gels work by natural evaporation and are simply placed in the space. The car unit works with the airflow through a vent. At industrial scale the same chemistry is delivered by spray rails, gel plate ramps, portable sprayers and spray cannons.",
  },
  {
    q: "How do I get Leocym products or ask a question?",
    a: "This website is for information only and does not sell. Write to info@leocym.com with the site, the smell and what has been tried so far, and the team will come back to you.",
  },
];

/* --------------------------------------------------------------- SCIENCE  */
/* The mechanism, the delivery modes, and how odour is actually assessed.
   Nothing here is a performance claim — it is how the chemistry is applied and
   how the industry measures the problem. */

export const DELIVERY: {
  mode: string;
  how: string;
  where: string;
  icon: IconName;
}[] = [
  {
    mode: "Poured",
    icon: "poured",
    how: "Liquid goes straight down the drain to the organic matter producing the smell.",
    where: "Drains, gullies, waste-water ducts",
  },
  {
    mode: "Sprayed",
    icon: "sprayed",
    how: "Applied directly to the soiled surface, or into the air away from people and animals.",
    where: "Urine, garbage, smoke, carpets, meat and fish areas",
  },
  {
    mode: "Evaporated",
    icon: "evaporated",
    how: "A polymer gel releases continuously into the air with no power and no moving parts.",
    where: "Washrooms, lobbies, storage, severe-odour plant rooms",
  },
  {
    mode: "Carried on airflow",
    icon: "airflow",
    how: "A vent-mounted unit uses the air already moving through the space.",
    where: "Cars, cabs, fleets",
  },
];

/**
 * Odour intensity as it is actually assessed in the field.
 * Source: Singh, Kajolinna, Sharma, Pellikka, Pathak & Kamyotra, "Case Study on
 * Odour Measurements in India", Chemical Engineering Transactions Vol. 40
 * (2014), a CPCB / VTT study using a six-step scale modified from VDI 3940.
 * Quoted as industry context, not as a claim about Leocym.
 */
export const INTENSITY_SCALE: { n: string; label: string }[] = [
  { n: "0", label: "No odour" },
  { n: "1", label: "Weak odour" },
  { n: "2", label: "Clear odour" },
  { n: "3", label: "Strong odour" },
  { n: "4", label: "Extremely strong odour" },
];

export const SCIENCE_NOTE =
  "In field assessment, an observer records what they can smell every ten seconds for ten minutes, and a reading counts as odorous if at least a tenth of those records register a smell. It is a reminder that odour is a measurable condition of a place, not a matter of opinion — and that the only honest way to judge a treatment is whether the reading falls.";
