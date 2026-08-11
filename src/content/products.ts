/**
 * The Leocym range - 26 products, transcribed from the printed product
 * catalogue. This file is the single source of truth: homepage sections and any
 * future product pages both read from here, so they can never drift apart.
 *
 * NOTE THE ABSENCE OF A PRICE FIELD. It is missing on purpose. This site is
 * information only and must never become a shop (Marketing Strategy §6.3).
 *
 * `accent` values were sampled from each product's own colour field in the
 * catalogue PDF - not invented, not generated.
 */

export type Family = "odour" | "cleaning";

export type Product = {
  slug: string;
  name: string;
  /** Running plate number, apothecary-catalogue style. */
  plate: number;
  family: Family;
  /** The "For Smelly Drains" line printed beside the product. */
  strapline: string;
  /** Short filter label - customers search the problem, not the brand. */
  problem: string;
  /** The product's own line from the catalogue, where it has one. */
  tagline?: string;
  /** Opening description. */
  description: string;
  /** The catalogue's "Application:" paragraph. */
  application: string;
  /** The catalogue's "mainly used by" / "works mainly through" line. */
  method: string;
  methodVerb: "mainly used by" | "works mainly through";
  /** Printed pack specifications. Manufacturer specs, not new claims. */
  specs?: { label: string; value: string }[];
  /** Sampled from the catalogue plate. */
  accent: string;
  image: string;
};

/** Every liquid Odrkill ships in these fragrances (catalogue, per product). */
export const FRAGRANCES = [
  "Citrus",
  "Pine",
  "Clove",
  "Lavender",
  "Mint",
  "Jasmine",
] as const;

const GEL_MECHANISM =
  "A high-performance odour neutralizer powered by advanced polymer gel technology. It combines a high concentration of perfuming agents with powerful neutralizing agents to deliver long-lasting, consistent and effective odour control. The synergistic action, instead of masking, actively neutralises unpleasant odours.";

const ALL_PURPOSE_DESC =
  "Ideal for everyday cleaning and maintenance. Can be used across commercial spaces - corporate offices, business parks, hospitals, malls, schools, universities, hotels, restaurants, cafés, government offices, multiplexes - and domestic spaces such as residential societies and retirement homes.";

const ALL_PURPOSE_APP =
  "A versatile multi-surface cleaner, formulated to effectively remove ink stains, pen marks, smudges and other common residues. Suitable for floors, tiles, and any washable surface requiring stain or grease removal.";

const DEGREASER_APP =
  "Designed for cleaning food industries, hood filters and ventilation boxes. This product dissolves grease.";

export const PRODUCTS: Product[] = [
  /* ------------------------------- ODOUR ------------------------------- */
  {
    slug: "drain-odrkill",
    name: "Drain Odrkill",
    plate: 1,
    family: "odour",
    strapline: "For smelly drains",
    problem: "Drains",
    tagline: "Specially formulated to eliminate odour emanating from drains",
    description:
      "Eliminates odour emanating from drains. Safe for use in households, banquet halls, restaurants, hotels, airports, offices, public toilets and all other areas.",
    application:
      "Specially formulated for eliminating olfactory nuisances emanating from drains. Applicable in all areas including household environments.",
    method: "pouring into the drains",
    methodVerb: "mainly used by",
    accent: "#B0D0CD",
    image: "/products/drain-odrkill.webp",
  },
  {
    slug: "urine-odrkill",
    name: "Urine Odrkill",
    plate: 2,
    family: "odour",
    strapline: "For foul urine smells",
    problem: "Urine",
    tagline:
      "Specially formulated to permanently eliminate olfactory nuisance related to urine odour",
    description:
      "Eliminates odours emanating from urine. Suitable for professional and domestic use, in public as well as domestic toilets. Also for public urinals at malls, hotels, concert and exhibition halls, portable toilets, trains and other forms of transport.",
    application:
      "Formulated to permanently eliminate the olfactory nuisances related to odours of all types of droppings, on the most diverse media, including household environments.",
    method: "spraying on the surfaces",
    methodVerb: "mainly used by",
    accent: "#E0DBE1",
    image: "/products/urine-odrkill.webp",
  },
  {
    slug: "waste-garbage-odrkill",
    name: "Waste & Garbage Odrkill",
    plate: 3,
    family: "odour",
    strapline: "For garbage and dustbin smells",
    problem: "Garbage",
    tagline:
      "Specially formulated to permanently eliminate olfactory nuisance related to waste and garbage",
    description:
      "Eliminates odours emanating from decomposing organic waste and garbage. Suitable for professional and domestic use. Can be used in landfills, dump sites, garbage houses, garbage carts, garbage trucks and other public and household sources of waste odour.",
    application:
      "Created to sustainably eliminate olfactory nuisances related to the decomposition of organic matter, in all areas including the household environment. Safe for fabrics, wood and paint. A solution for bad odours from garden sheds, trailers transporting green waste, shoe cabinets and wastewater ducts.",
    method: "spraying on the surfaces",
    methodVerb: "mainly used by",
    accent: "#D8D8BC",
    image: "/products/waste-garbage-odrkill.webp",
  },
  {
    slug: "carpcare",
    name: "CarpCare",
    plate: 4,
    family: "odour",
    strapline: "For smelly carpets",
    problem: "Carpets",
    tagline:
      "Specially formulated to permanently eliminate olfactory nuisance encrusted in textile floors",
    description:
      "Eliminates odour encrusted in textile floors. Safe for use in households, restaurants, hotels, banquet halls, airports, public and all other areas using textile floors.",
    application:
      "Created to sustainably eliminate olfactory nuisances encrusted in textile floors, in all areas including the household environment. Safe for all types of fabric. No stains left behind. Spray from an adequate distance.",
    method: "spraying on the carpet",
    methodVerb: "mainly used by",
    accent: "#CFE0CD",
    image: "/products/carpcare.webp",
  },
  {
    slug: "smoke-odrkill",
    name: "Smoke Odrkill",
    plate: 5,
    family: "odour",
    strapline: "For smoke smells at homes, cars, hotels and smoking zones",
    problem: "Smoke",
    tagline:
      "Specially formulated to eliminate odour emanating from smoke of tobacco products",
    description:
      "Eliminates odour emanating from the smoke of tobacco products. Suitable for cars, offices and households. Can be safely used on seats, floors and roof carpets of cars, as well as curtains, carpets of all kinds and other home furnishings. Can also be used on leather.",
    application:
      "Specially designed for eliminating olfactory nuisances emanating from the smoke of tobacco products. Can also be used by spraying in the air, outside of human or animal presence.",
    method: "spraying on the surfaces",
    methodVerb: "mainly used by",
    accent: "#CCCFE2",
    image: "/products/smoke-odrkill.webp",
  },
  {
    slug: "meat-odrkill",
    name: "Meat Odrkill",
    plate: 6,
    family: "odour",
    strapline: "For unpleasant meat smells",
    problem: "Meat",
    tagline:
      "Specially designed to permanently eliminate olfactory nuisance related to meat odour",
    description:
      "Eliminates odour emanating from meat. Suitable for professional and domestic use. Can be used in vehicles transporting meat, stalls and equipment, areas surrounding weekly markets, meat markets, restaurants, shops and households.",
    application:
      "Designed to permanently eliminate olfactory nuisances related to meat odour. Do not spray on food products.",
    method: "spraying on the surfaces",
    methodVerb: "mainly used by",
    accent: "#F2DAD6",
    image: "/products/meat-odrkill.webp",
  },
  {
    slug: "fish-odrkill",
    name: "Fish Odrkill",
    plate: 7,
    family: "odour",
    strapline: "For unpleasant fish smells",
    problem: "Fish",
    tagline:
      "Specially designed to permanently eliminate olfactory nuisance related to fish odour",
    description:
      "Eliminates odours emanating from fish. Suitable for professional and domestic use. Can be used in vehicles transporting fish, stalls and equipment, areas surrounding weekly markets, fish markets, restaurants, shops and households.",
    application:
      "Formulated to permanently eliminate olfactory nuisances related to fish odour, and can be used on all kinds of surroundings. Do not spray on food products, or on humans or animals in any manner.",
    method: "spraying on the surfaces",
    methodVerb: "mainly used by",
    accent: "#E7F0F9",
    image: "/products/fish-odrkill.webp",
  },
  {
    slug: "paint-odrkill",
    name: "Paint Odrkill",
    plate: 8,
    family: "odour",
    strapline: "For paint smell",
    problem: "Paint",
    tagline: "Removes strong paint smell during and after painting",
    description:
      "Ideal for use during and after painting. Can be used in a wide range of indoor environments including residential homes, apartments, offices, shops, hospitals, hotels, schools, restaurants, public and commercial spaces, and other enclosed freshly painted areas.",
    application:
      "Specially formulated to eliminate strong paint odour during and after painting. Neutralises lingering fumes from fresh paint, putty, varnish and coatings, leaving indoor spaces breathable and comfortable.",
    method: "spraying on the walls and painted surfaces",
    methodVerb: "mainly used by",
    accent: "#C4B8D0",
    image: "/products/paint-odrkill.webp",
  },
  {
    slug: "urinal-care-mat",
    name: "UrinalCare Mat",
    plate: 9,
    family: "odour",
    strapline: "For smelly urinals",
    problem: "Urinals",
    tagline: "Curative and persistent action",
    description:
      "Ideal for high-traffic washrooms in commercial spaces - corporate offices, business parks, hospitals, malls, schools, universities, hotels, restaurants, cafés, government offices, multiplexes - and public or domestic spaces such as residential societies, retirement homes, transport hubs and public washrooms.",
    application:
      "A hygienic urinal care mat that controls odour, prevents blockages and reduces splash-back, ensuring a cleaner washroom environment. It also releases a fresh fragrance with every flush.",
    method: "placing in the urinals",
    methodVerb: "mainly used by",
    specs: [
      { label: "Effective", value: "6 weeks" },
      {
        label: "Composition",
        value: "Ethyl methylphenylglycidate, piperonal",
      },
      { label: "Storage", value: "Up to 2 years sealed, between 5°C and 45°C" },
    ],
    accent: "#F4E1F7",
    image: "/products/urinal-care-mat.webp",
  },
  {
    slug: "odoclr",
    name: "Odoclr",
    plate: 10,
    family: "odour",
    strapline: "For persistent indoor odours",
    problem: "Indoor",
    tagline: "Odour neutralizer",
    description:
      "Ideal for continuous odour control in commercial spaces - corporate offices, business parks, hospitals, malls, schools, universities, hotels, restaurants, cafés, government offices, multiplexes - and domestic spaces such as residential societies, retirement homes, kitchens, washrooms, living rooms and storage areas. Highly effective in high-traffic or enclosed environments prone to persistent odours.",
    application: GEL_MECHANISM,
    method: "natural evaporation",
    methodVerb: "works mainly through",
    accent: "#9BB9C4",
    image: "/products/odoclr.webp",
  },
  {
    slug: "aerofresh",
    name: "AeroFresh",
    plate: 11,
    family: "odour",
    strapline: "For fresh indoor air",
    problem: "Indoor air",
    tagline: "A scent of the nature",
    description:
      "Suitable for use in commercial spaces - corporate offices, business parks, hospitals, malls, schools, universities, hotels, restaurants, live counters, cafés, government offices, multiplexes - and domestic spaces such as residential societies, retirement homes, kitchens, living rooms, washrooms, garages and storage areas.",
    application:
      "An odour neutralizer designed to combat unpleasant smells through natural evaporation. It effectively eliminates odours from multiple sources, leaving the environment fresh and pleasant.",
    method: "natural evaporation",
    methodVerb: "works mainly through",
    accent: "#D1EEFE",
    image: "/products/aerofresh.webp",
  },
  {
    slug: "carfresh",
    name: "CarFresh",
    plate: 12,
    family: "odour",
    strapline: "For car odours",
    problem: "Cars",
    description:
      "Specifically designed for vehicles of all types - cars, SUVs, taxis, company fleets and commercial vehicles. Ideal for drivers and passengers seeking a healthier, fresher and more comfortable in-car environment.",
    application:
      "An advanced car odour neutralizer designed to eliminate unpleasant smells without using overpowering fragrances. Unlike conventional car fresheners, CarFresh does not cause headaches or nausea and avoids heavy scents - instead it neutralizes odours and leaves the car smelling like fresh air. The black holder contains a resin communication surface with a soft plastic clip for easy attachment to the car's air vent.",
    method: "airflow",
    methodVerb: "mainly used by",
    specs: [
      { label: "Effective", value: "Up to 6 months per unit" },
      { label: "Scents", value: "Multiple subtle scents" },
    ],
    accent: "#82C4DE",
    image: "/products/carfresh.webp",
  },
  {
    slug: "crushed-gel",
    name: "Crushed Gel",
    plate: 13,
    family: "odour",
    strapline: "For extreme odours",
    problem: "Extreme",
    description:
      "Ideal for continuous odour control in commercial and domestic spaces, and highly effective in severe odour areas such as STP plants, ETP, and meat and fish processing plants.",
    application: GEL_MECHANISM,
    method: "natural evaporation",
    methodVerb: "works mainly through",
    accent: "#FFBEB0",
    image: "/products/crushed-gel.webp",
  },

  /* ------------------------------ CLEANING ----------------------------- */
  {
    slug: "maxscrub",
    name: "MaxScrub",
    plate: 14,
    family: "cleaning",
    strapline: "All-purpose multi-surface cleaning",
    problem: "All-purpose",
    tagline: "Heavy duty cleaning for every surface",
    description: ALL_PURPOSE_DESC,
    application: ALL_PURPOSE_APP,
    method: "diluting in water or spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Refreshing citrus zest" },
      { label: "Format", value: "500 ml bottle" },
    ],
    accent: "#ECEADE",
    image: "/products/maxscrub.webp",
  },
  {
    slug: "deepclean",
    name: "DeepClean",
    plate: 15,
    family: "cleaning",
    strapline: "All-purpose multi-surface cleaning",
    problem: "All-purpose",
    tagline: "Deep cleaning power, effortless shine",
    description: ALL_PURPOSE_DESC,
    application: ALL_PURPOSE_APP,
    method: "diluting in water or spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Refreshing citrus zest" },
      { label: "Format", value: "500 ml bottle" },
    ],
    accent: "#DFF0DD",
    image: "/products/deepclean.webp",
  },
  {
    slug: "natureclean",
    name: "NatureClean",
    plate: 16,
    family: "cleaning",
    strapline: "All-purpose multi-surface cleaning",
    problem: "All-purpose",
    tagline: "Nature powered, surface safe",
    description: ALL_PURPOSE_DESC,
    application: ALL_PURPOSE_APP,
    method: "diluting in water or spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Refreshing citrus zest" },
      { label: "Format", value: "500 ml bottle" },
    ],
    accent: "#E1F0DD",
    image: "/products/natureclean.webp",
  },
  {
    slug: "freshclean",
    name: "FreshClean",
    plate: 17,
    family: "cleaning",
    strapline: "For everyday cleaning",
    problem: "Everyday",
    tagline: "The ultimate multi-surface cleaner",
    description: ALL_PURPOSE_DESC,
    application: ALL_PURPOSE_APP,
    method: "diluting in water or spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "98% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Refreshing citrus zest" },
    ],
    accent: "#E4E4C8",
    image: "/products/freshclean.webp",
  },
  {
    slug: "shinex",
    name: "ShineX",
    plate: 18,
    family: "cleaning",
    strapline: "For spotless glass surfaces",
    problem: "Glass",
    tagline: "Crystal clear, every time",
    description: ALL_PURPOSE_DESC,
    application:
      "Cleans, degreases and shines glass windows, doors, mirrors and all modern washable surfaces such as lacquered and laminated finishes, without leaving streaks or haze. Effective on interior glass surfaces.",
    method: "diluting in water or spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Fresh air" },
    ],
    accent: "#DEF0F0",
    image: "/products/shinex.webp",
  },
  {
    slug: "greaseblast",
    name: "GreaseBlast",
    plate: 19,
    family: "cleaning",
    strapline: "For tough grease and oil",
    problem: "Grease",
    tagline: "Breaks through the toughest grease",
    description:
      "Designed for use in the food industry. Also suitable for cleaning surfaces across commercial and domestic environments. This ready-to-use, diluted formula comes in a convenient 500 ml spray bottle.",
    application:
      "An effective degreaser specially formulated to remove dirt, oil, grease and food deposits. It acts swiftly, even on heavily soiled surfaces.",
    method: "spraying or brushing evenly on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "98% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Fragrance-free" },
      { label: "Format", value: "500 ml ready-to-use spray" },
    ],
    accent: "#FEFCF0",
    image: "/products/greaseblast.webp",
  },
  {
    slug: "essentialx-bioclean",
    name: "EssentialX BioClean",
    plate: 20,
    family: "cleaning",
    strapline: "For tough greasy surfaces",
    problem: "Grease",
    tagline: "Effortless degreasing, spotless surfaces",
    description:
      "Use on floors, tiles, kitchens and any surface that requires grease removal, across commercial and domestic spaces.",
    application: DEGREASER_APP,
    method: "spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Fragrance-free" },
    ],
    accent: "#CEC4C3",
    image: "/products/essentialx-bioclean.webp",
  },
  {
    slug: "essentialx-pureclean",
    name: "EssentialX PureClean",
    plate: 21,
    family: "cleaning",
    strapline: "For tough greasy surfaces",
    problem: "Grease",
    tagline: "Pure degreasing power",
    description:
      "Use on floors, tiles, kitchens and any surface that requires grease removal, across commercial and domestic spaces.",
    application: DEGREASER_APP,
    method: "spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Fragrance-free" },
    ],
    accent: "#D9EAFE",
    image: "/products/essentialx-pureclean.webp",
  },
  {
    slug: "ovenwonder-maxpower",
    name: "OvenWonder MaxPower",
    plate: 22,
    family: "cleaning",
    strapline: "For grease and oil removal",
    problem: "Grease",
    tagline: "Pure formula, strong results",
    description:
      "Its active formula allows effective cleaning of all surfaces to be treated. It works on both cooked and uncooked grease. Its wetting surfactant removes stubborn dirt and works in conjunction with potash.",
    application:
      "Allows the degreasing and cleaning of cooking equipment. Clings for greater effectiveness. Low-foaming and easy to rinse. Strips ovens, grills, rotisseries, barbecues and fireplace inserts.",
    method: "spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "98% ingredients of plant or mineral origin",
      },
      { label: "Scent", value: "Pleasant energizing fragrance" },
    ],
    accent: "#E6D8D8",
    image: "/products/ovenwonder-maxpower.webp",
  },
  {
    slug: "kitchenkleen",
    name: "KitchenKleen",
    plate: 23,
    family: "cleaning",
    strapline: "For greasy kitchen surfaces",
    problem: "Kitchen",
    tagline: "Degreasing made simple",
    description:
      "Designed for use in the food industry. Also suitable for cleaning surfaces across commercial and domestic environments. This ready-to-use, diluted formula comes in a convenient 500 ml spray bottle.",
    application:
      "An effective degreaser specially formulated to remove dirt, oil, grease and food deposits. It acts swiftly, even on heavily soiled surfaces.",
    method: "spraying or brushing evenly on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "98% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Fragrance-free" },
      { label: "Format", value: "500 ml ready-to-use spray" },
    ],
    accent: "#FFE7CD",
    image: "/products/kitchenkleen.webp",
  },
  {
    slug: "scalexpert",
    name: "ScaleXpert",
    plate: 24,
    family: "cleaning",
    strapline: "For stubborn scale on fittings",
    problem: "Scale & stains",
    tagline: "Fights scale, fast and fierce",
    description:
      "Ideal for everyday cleaning and maintenance of sanitary surfaces across commercial and domestic spaces.",
    application:
      "Descales and cleans all sanitary surfaces - bathroom, toilet, shower, glass partitions, walls and tiles. It has a daily descaling action, removes soap deposits and makes surfaces shine.",
    method: "spraying on the surface",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Pleasant energizing fragrance" },
    ],
    accent: "#EBDAEA",
    image: "/products/scalexpert.webp",
  },
  {
    slug: "drainflow",
    name: "DrainFlow",
    plate: 25,
    family: "cleaning",
    strapline: "For clearing drain blockages",
    problem: "Blockages",
    tagline: "Gentle on pipes, tough on blocks",
    description:
      "Can be used in a wide range of environments including commercial spaces and domestic spaces such as residential societies and retirement homes.",
    application:
      "A super-active product that provides immediate action to unblock pipes and sanitary facilities such as toilets, urinals, sinks and washbasins.",
    method: "adding to a water bucket",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Pleasant fragrance" },
    ],
    accent: "#DACECE",
    image: "/products/drainflow.webp",
  },
  {
    slug: "carshine",
    name: "CarShine",
    plate: 26,
    family: "cleaning",
    strapline: "For car cleaning",
    problem: "Vehicles",
    tagline: "Your ride, your daily shine",
    description:
      "Suitable for all types of vehicles including private, public and commercial.",
    application:
      "A shampoo that cleans, degreases and removes static from vehicles. Used in general and high-pressure car washes on all types of bodywork. Can be used for both exteriors and plastic interiors.",
    method: "adding to a water bucket",
    methodVerb: "mainly used by",
    specs: [
      {
        label: "Composition",
        value: "99% ingredients of plant & mineral origin",
      },
      { label: "Scent", value: "Pleasant fragrance" },
    ],
    accent: "#D6DCDA",
    image: "/products/carshine.webp",
  },
];

/** Odrkill liquids are the ones offered across the fragrance range. */
export const FRAGRANCE_RANGE_SLUGS = new Set([
  "drain-odrkill",
  "urine-odrkill",
  "waste-garbage-odrkill",
  "carpcare",
  "smoke-odrkill",
  "meat-odrkill",
  "fish-odrkill",
  "paint-odrkill",
]);

export const ODOUR_PRODUCTS = PRODUCTS.filter((p) => p.family === "odour");
export const CLEANING_PRODUCTS = PRODUCTS.filter(
  (p) => p.family === "cleaning",
);

/** Unique problem filters, in catalogue order. */
export function problemsFor(family: Family): string[] {
  const seen: string[] = [];
  for (const p of PRODUCTS) {
    if (p.family === family && !seen.includes(p.problem)) seen.push(p.problem);
  }
  return seen;
}
