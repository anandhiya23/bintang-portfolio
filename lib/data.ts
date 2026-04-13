// ─── Site identity ────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "BINTANG.dev",
  tagline: "Building bridges between design & logic.",
  status: "Open to Opportunities",
  philosophy:
    "The screen is a structured, multi-dimensional space where logic meets aesthetic restraint.",
  copyright: "© 2026 Bintang Anandhiya. All rights reserved.",
};

// ─── Navigation links (footer) ────────────────────────────────────────────────

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/bintanganandhiya" },
  { label: "LinkedIn", href: "#" },
  { label: "Read.cv", href: "#" },
];

// ─── Values / About ───────────────────────────────────────────────────────────

export const values = [
  {
    title: "Precision Engineering",
    body: "Code is the architecture of the digital world. I write clean, scalable systems that respect structural integrity at every layer.",
  },
  {
    title: "Data-Driven Logic",
    body: "Visuals should never be arbitrary. Every component is grounded in user research and technical feasibility — no aesthetic for its own sake.",
  },
  {
    title: "Hybrid Execution",
    body: "Eliminating hand-off friction by owning the entire vertical — from initial concept and system design to final deployment and monitoring.",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  index: string;
  slug: string;
  title: string;  // monospace label (ALL_CAPS)
  name: string;   // display name (human-readable)
  date: string;
  tags: string[];
  description: string;
  /** Image src paths. Use picsum.photos seeds for mock; replace with real paths when available. */
  images: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "pesta-kita",
    title: "PESTA_KITA",
    name: "Pesta Kita",
    date: "Logo, Branding, Event",
    tags: ["Logo", "Branding", "Event"],
    description:
      "Pesta Kita is a movement led by influential young leaders in Indonesia. Our core mission is to reshape the landscape of youth engagement in politics and leadership within our nation.",
    images: [
      "https://picsum.photos/seed/pesta-kita-1/1600/900",
      "https://picsum.photos/seed/pesta-kita-2/1600/900",
      "https://picsum.photos/seed/pesta-kita-3/1600/900",
      "https://picsum.photos/seed/jyf-1/1600/900",
      "https://picsum.photos/seed/jyf-2/1600/900",
      "https://picsum.photos/seed/jyf-3/1600/900",
    ],
  },
  {
    index: "02",
    slug: "jakarta-youth-festival",
    title: "JAKARTA_YOUTH_FESTIVAL",
    name: "Jakarta Youth Festival",
    date: "Logo, Social Media, Event",
    tags: ["Logo", "Social Media", "Event"],
    description:
      "A series of activities for national youth to showcase their work, creativity, and ideas in the four Y20 priority areas. In an effort to facilitate the movement of young people with fresh thoughts and ideas.",
    images: [
      "/jakarta_youth_festival/JYF1.png",
      "/jakarta_youth_festival/JYF2.png",
      "/jakarta_youth_festival/JYF3.png",
      "/jakarta_youth_festival/JYF4.png",
      "/jakarta_youth_festival/JYF5.png",
    ],
  },
  {
    index: "03",
    slug: "gdsc-sampoerna",
    title: "GDSC_SAMPOERNA",
    name: "GDSC Sampoerna University",
    date: "Organization Leader",
    tags: ["Social Media", "Branding"],
    description:
      "GDSC uses Google's design guidelines as a reference while also adding our own unique patterns and fresh layouts. The brightly colored and fun composition shows the organisation's lighthearted values and playfulness.",
    images: [
      "https://picsum.photos/seed/gdsc-1/1600/900",
      "https://picsum.photos/seed/gdsc-2/1600/900",
      "https://picsum.photos/seed/gdsc-3/1600/900",
    ],
  },
  {
    index: "04",
    slug: "tedx-sampoerna-2022",
    title: "TEDX_SAMPOERNA_2022",
    name: "TEDx Sampoerna University 2022",
    date: "Social Media & Proposal",
    tags: ["Social Media", "Proposal"],
    description:
      "TEDxSampoernaUniversity 2022 expresses an interesting design concept that took inspiration from old media and prints. It incorporates multiple font families and vintage colors.",
    images: [
      "https://picsum.photos/seed/tedx-1/1600/900",
      "https://picsum.photos/seed/tedx-2/1600/900",
      "https://picsum.photos/seed/tedx-3/1600/900",
    ],
  },
  {
    index: "05",
    slug: "a-new-dawn",
    title: "A_NEW_DAWN",
    name: "A New Dawn",
    date: "Logo & Social Media",
    tags: ["Logo", "Social Media"],
    description:
      "A New Dawn is a revolutionary movement within our campus student organisations. The design uses powerful photos and epic illustrations to convey unity and greatness.",
    images: [
      "https://picsum.photos/seed/anewdawn-1/1600/900",
      "https://picsum.photos/seed/anewdawn-2/1600/900",
      "https://picsum.photos/seed/anewdawn-3/1600/900",
    ],
  },
  {
    index: "06",
    slug: "centennialz-black",
    title: "CENTENNIALZ_BLACK",
    name: "CentennialZ — Black Period",
    date: "Social Media",
    tags: ["Social Media", "Typography"],
    description:
      'CentennialZ\'s design transforms through the ages. The "Black Period" conveys the transition of the organisation in 2022. Through the strong typography and ornaments gives modern and serious vibes.',
    images: [
      "https://picsum.photos/seed/czblack-1/1600/900",
      "https://picsum.photos/seed/czblack-2/1600/900",
      "https://picsum.photos/seed/czblack-3/1600/900",
    ],
  },
  {
    index: "07",
    slug: "centennialz-blue",
    title: "CENTENNIALZ_BLUE",
    name: "CentennialZ — Blue & White Period",
    date: "Company Profile, Logo, Social Media",
    tags: ["Company Profile", "Logo", "Social Media"],
    description:
      'CentennialZ\'s design transforms through the ages. The "Blue & White Period" conveys the rebirth of the organisation in 2022. The light colors resembles our strong spirit and bright future.',
    images: [
      "https://picsum.photos/seed/czblue-1/1600/900",
      "https://picsum.photos/seed/czblue-2/1600/900",
      "https://picsum.photos/seed/czblue-3/1600/900",
    ],
  },
  {
    index: "08",
    slug: "bem-km-su-pandavas",
    title: "BEM_KM_SU_PANDAVAS",
    name: "BEM KM SU Pandavas",
    date: "Social Media & Other Publishing",
    tags: ["Social Media", "Publishing"],
    description:
      "BEM KM SU Pandavas cabinet emphasize a stylistic design and elegant composition. With consistent color palette and styling we establish a strong brand image.",
    images: [
      "https://picsum.photos/seed/pandavas-1/1600/900",
      "https://picsum.photos/seed/pandavas-2/1600/900",
      "https://picsum.photos/seed/pandavas-3/1600/900",
    ],
  },
  {
    index: "09",
    slug: "ajakgerak",
    title: "AJAKGERAK",
    name: "AjakGerak",
    date: "Social Media & Branding",
    tags: ["Social Media", "Branding"],
    description:
      "After almost 2 years with AjakGerak, I have seen the design and branding evolve over time. Through iterative design we learn how to improve the content production quality and design efficiency.",
    images: [
      "https://picsum.photos/seed/ajakgerak-1/1600/900",
      "https://picsum.photos/seed/ajakgerak-2/1600/900",
      "https://picsum.photos/seed/ajakgerak-3/1600/900",
    ],
  },
];
