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
  { label: "GitHub", href: "https://github.com/anandhiya23" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bintanganandhiya/" },
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
  images: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "murka",
    title: "MURKA",
    name: "Murka",
    date: "Branding, Social Media, Event",
    tags: ["Branding", "Social Media", "Event"],
    description:
      "Murka — short for Muda Cari Kaya — is a South Jakarta-based creative agency built on the hunger and hustle of youth. Specializing in event organizing and social media management services (SMMS), Murka bridges the gap between raw creative energy and polished brand execution. The identity is bold, street-smart, and unapologetically ambitious: a reflection of a generation that refuses to wait its turn. From concept to crowd, Murka turns ideas into experiences and feeds into the cultural pulse of a city that never slows down.",
    images: [
      "/murka/1 (1).png",
      "/murka/2 (1).png",
      "/murka/3 (1).png",
    ],
  },
  {
    index: "02",
    slug: "pesta-kita",
    title: "PESTA_KITA",
    name: "Pesta Kita",
    date: "Logo, Branding, Event",
    tags: ["Logo", "Branding", "Event"],
    description:
      "Pesta Kita is a movement led by influential young leaders in Indonesia. Our core mission is to reshape the landscape of youth engagement in politics and leadership within our nation.",
    images: [
      "/pesta_kita/Slide 16_9 - 18.png",
      "/pesta_kita/Slide 16_9 - 19.png",
      "/pesta_kita/Slide 16_9 - 20.png",
    ],
  },
  {
    index: "03",
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
    index: "04",
    slug: "jiwajiwa",
    title: "JIWAJIWA",
    name: "JiwaJiwa",
    date: "Branding, Visual Identity",
    tags: ["Branding", "Visual Identity"],
    description:
      "Welcome to JiwaJiwa, a home for every story and feeling. A talent management agency focused on mental health and wellbeing.",
    images: [
      "/jiwajiwa/KV Jiwa Jiwa 12.png",
      "/jiwajiwa/KV Jiwa Jiwa 14 (1).png",
      "/jiwajiwa/KV Jiwa Jiwa 13.png",
    ],
  },
  {
    index: "05",
    slug: "yayasan-bumn",
    title: "YAYASAN_BUMN",
    name: "Yayasan BUMN",
    date: "Branding, Visual Identity",
    tags: ["Branding", "Visual Identity"],
    description:
      "Inspired by the \"Indonesia Raya\" anthem, this identity embodies a transformative vision for Yayasan BUMN — nurturing the nation's soul through Jiwa Raga, Pikiran, Alam, Bangsa, and Hidup. The design seeks to uplift individual spirits, minds, and lives, echoing the anthem's call to awaken the nation's essence, intellect, nature, life, and unity for a greater Indonesia.",
    images: [
      "/yayasan_bumn/1.png",
      "/yayasan_bumn/2.png",
      "/yayasan_bumn/3.png",
    ],
  },
  {
    index: "06",
    slug: "gdsc-sampoerna-university",
    title: "GDSC_SAMPOERNA",
    name: "GDSC Sampoerna University",
    date: "Organization Leader",
    tags: ["Social Media", "Branding"],
    description:
      "GDSC uses Google's design guidelines as a reference while also adding our own unique patterns and fresh layouts. The brightly colored and fun composition shows the organisation's lighthearted values and playfulness.",
    images: [
      "/gdsc/Design Porto 23.png",
      "/gdsc/Design Porto 24.png",
      "/gdsc/Design Porto 25.png",
    ],
  },
  {
    index: "07",
    slug: "tedx-sampoerna-2022",
    title: "TEDX_SAMPOERNA_2022",
    name: "TEDx Sampoerna University 2022",
    date: "Social Media & Proposal",
    tags: ["Social Media", "Proposal"],
    description:
      "TEDxSampoernaUniversity 2022 expresses an interesting design concept that took inspiration from old media and prints. It incorporates multiple font families and vintage colors.",
    images: [
      "/tedx_sampoerna/Design Porto 20.png",
      "/tedx_sampoerna/Design Porto 21.png",
      "/tedx_sampoerna/Design Porto 22.png",
    ],
  },
  {
    index: "08",
    slug: "a-new-dawn",
    title: "A_NEW_DAWN",
    name: "A New Dawn",
    date: "Logo & Social Media",
    tags: ["Logo", "Social Media"],
    description:
      "A New Dawn is a revolutionary movement within our campus student organisations. The design uses powerful photos and epic illustrations to convey unity and greatness.",
    images: [
      "/singles/A New Dawn.png",
    ],
  },
  {
    index: "09",
    slug: "centennialz-black",
    title: "CENTENNIALZ_BLACK",
    name: "CentennialZ — Black Period",
    date: "Social Media",
    tags: ["Social Media", "Typography"],
    description:
      'CentennialZ\'s design transforms through the ages. The "Black Period" conveys the transition of the organisation in 2022. Through the strong typography and ornaments gives modern and serious vibes.',
    images: [
      "/centennialz_black/Design Porto 17.png",
      "/centennialz_black/Design Porto 18.png",
      "/centennialz_black/Design Porto 19.png",
    ],
  },
  {
    index: "10",
    slug: "centennialz-blue",
    title: "CENTENNIALZ_BLUE",
    name: "CentennialZ — Blue & White Period",
    date: "Company Profile, Logo, Social Media",
    tags: ["Company Profile", "Logo", "Social Media"],
    description:
      'CentennialZ\'s design transforms through the ages. The "Blue & White Period" conveys the rebirth of the organisation in 2022. The light colors resembles our strong spirit and bright future.',
    images: [
      "/singles/CentennialZBlue.png",
    ],
  },
  {
    index: "11",
    slug: "bem-km-su-pandavas",
    title: "BEM_KM_SU_PANDAVAS",
    name: "BEM KM SU Pandavas",
    date: "Social Media & Other Publishing",
    tags: ["Social Media", "Publishing"],
    description:
      "BEM KM SU Pandavas cabinet emphasize a stylistic design and elegant composition. With consistent color palette and styling we establish a strong brand image.",
    images: [
      "/singles/Pandawa Cabinet.png",
    ],
  },
  {
    index: "12",
    slug: "ajakgerak",
    title: "AJAKGERAK",
    name: "AjakGerak",
    date: "Social Media & Branding",
    tags: ["Social Media", "Branding"],
    description:
      "After almost 2 years with AjakGerak, I have seen the design and branding evolve over time. Through iterative design we learn how to improve the content production quality and design efficiency.",
    images: [
      "/singles/AjakGerak.png",
    ],
  },
];
