/**
 * Industrial and large-scale odour control - catalogue pages 34–39.
 *
 * Strategic purpose (Marketing Strategy §6.5): a facility manager who sees this
 * technology handling an entire landfill or water treatment plant will trust it
 * completely for their washrooms. This section is the credibility engine of the
 * whole site, and the entry point for tender-winning contractors.
 */

import type { IconName } from "@/components/Icon";

export type IndustrialSegment = {
  slug: string;
  /** Running numeral, spec-sheet style. */
  index: string;
  title: string;
  /** One line on why this segment matters. Ours, not the catalogue's. */
  premise: string;
  areas: string[];
  techniques: string[];
  /** One image per segment. Five segments with different photo counts read as
      inconsistency, not rhythm — the structure has to repeat exactly so the
      reader can scan it. */
  image: string;
  icon: IconName;
};

export const INDUSTRIAL: IndustrialSegment[] = [
  {
    slug: "waste-water",
    index: "01",
    title: "Waste water",
    premise:
      "Treatment infrastructure sits inside cities. The odour travels further than the plant does.",
    areas: [
      "Water treatment plants",
      "Pumping stations",
      "Waste water networks",
      "Lagoons",
    ],
    techniques: [
      "High-pressure spray rails",
      "Strong directional spray heads",
      "Dry steam, raising and drying green house",
      "Incorporation into waste water and sludge",
      "Gel plates and biodegradable gels",
      "Sprinklers for sludge storage and transportation",
      "Treatment of washers in degraded mode",
    ],
    image: "/stock/waste-water-1.webp",
    icon: "water",
  },
  {
    slug: "waste",
    index: "02",
    title: "Waste",
    premise:
      "Decomposition does not pause for the working day. Treatment has to be continuous and it has to reach.",
    areas: [
      "Non-hazardous waste storage facilities",
      "Sanitary landfills",
      "Anaerobic digestion plants",
      "Household waste transfer centres",
      "Incinerators",
      "Methanization",
      "Composting: sludge, green waste, landfills, dumpsites",
    ],
    techniques: [
      "High-pressure ramps",
      "Spray cannon installed on an agricultural tractor",
      "Spray cannon with 400 m reach",
      "Portable sprayer, 220 V",
      "Gel plate ramps",
    ],
    image: "/stock/waste-1.webp",
    icon: "waste",
  },
  {
    slug: "on-site-decontamination",
    index: "03",
    title: "On-site decontamination support",
    premise:
      "Ground that has held hydrocarbons for decades releases it slowly, and always while people are working nearby.",
    areas: [
      "Former gas and chemical plants",
      "Chemical waste",
      "Refineries",
      "Metro line tunnelling",
      "Former service stations",
    ],
    techniques: [
      "High-pressure ramps",
      "Spray cannon installed on an agricultural tractor",
      "Spray cannon with 400 m reach",
      "Portable sprayer, 220 V",
      "Gel plate ramps",
    ],
    image: "/stock/decon-1.webp",
    icon: "decontamination",
  },
  {
    slug: "industries",
    index: "04",
    title: "Industries",
    premise:
      "Process odour is a licence condition before it is a nuisance. It is measured at the boundary, not at the stack.",
    areas: [
      "Petrochemicals",
      "Paper mills",
      "Slaughterhouses",
      "Automotive industries",
      "Rubber industries",
      "Plastic industries",
      "All other types of industry",
    ],
    techniques: ["Air processing", "Incorporation"],
    image: "/stock/industries-1.webp",
    icon: "industry",
  },
  {
    slug: "pollution-control-sites",
    index: "05",
    title: "Pollution control sites",
    premise:
      "Remediation work is temporary, mobile and public-facing. The odour control has to move with it.",
    areas: [
      "Supporting the deodorizing components with a range of adapted reagents",
      "Latest equipment",
    ],
    techniques: [
      "Tractor spray units",
      "High-pressure spray rails",
      "Skids",
      "Electric gun",
    ],
    image: "/stock/pollution-1.webp",
    icon: "emissions",
  },
];
