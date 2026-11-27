// Long-form case study copy for /work/[slug]. Background facts about each
// client come from the public sources listed per project. Design notes
// describe what the delivered artwork (in /public) actually shows.

export type ProjectDetail = {
  year?: string;
  client: string;
  role?: string;
  summary: string;
  context: string[];
  approach: string[];
  deliverables: string[];
  facts?: { label: string; value: string }[];
  palette?: { name: string; hex: string }[];
  sources?: { label: string; href: string }[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  murka: {
    year: "2026",
    client: "Murka (Muda Cari Kaya)",
    role: "Graphic Design Lead",
    summary: "A loud, street-smart identity and website for a South Jakarta creative agency run by and for young people.",
    context: [
      "Murka, short for Muda Cari Kaya (roughly, “young and chasing it”), is a South Jakarta creative agency that runs events and social media management for brands. The team is young, and the name says the ambition out loud.",
      "The brief was to make an agency that sells hype look credible: an identity that still feels like it came from the street, and a website that proves the work with numbers.",
    ],
    approach: [
      "The identity runs on an acid lime field with a heavy black wordmark and a hand-drawn “M” mark in front of it. The colour is impossible to scroll past on a feed, and the black keeps it from looking cheap.",
      "The same system carries into team cards (the founders photographed against the lime) and a dark website where the wordmark becomes a huge, cropped, motion-blurred headline. Proof points such as 100+ and 30+ sit in big numerals right under the hero, so the claims arrive before the scroll does.",
    ],
    deliverables: ["Logo & wordmark", "Brand system", "Team portraits layout", "Website design", "Social media"],
    palette: [
      { name: "Acid Lime", hex: "#C6F31A" },
      { name: "Ink", hex: "#111111" },
    ],
  },
  "pesta-kita": {
    year: "2023",
    client: "Pesta Kita",
    summary: "A campaign identity that turns Indonesia’s 2024 election into an invitation: “Sudah siap berpesta?”",
    context: [
      "Pesta Kita (“Our Party”) is a movement led by young Indonesian leaders. Its mission is to change how young people take part in politics and leadership. The name plays on pesta demokrasi, the everyday Indonesian phrase for an election.",
      "The campaign launched on 15 October 2023, a few months before the February 2024 general election, and spoke to first-time and Gen Z voters.",
    ],
    approach: [
      "The launch key visual is an invitation card held up against a halftone city: “Sudah siap berpesta? Segera dirayakan!” (“Ready to party? Celebrations coming soon!”). Politics is framed as something you’re invited to, not lectured about.",
      "The system pairs a friendly serif wordmark with confetti shapes in primary colours and cut-out portraits of the movement’s young figures. A carousel series then uses the same paper texture for explainers on youth employment, corruption, Gen Z voter numbers and how to vet a candidate. It looks like a party and still reads like a briefing.",
    ],
    deliverables: ["Logo", "Campaign key visual", "Figure portrait series", "Educational carousels", "Event branding"],
    facts: [{ label: "Launch", value: "15.10.2023" }],
  },
  "jakarta-youth-festival": {
    year: "2022",
    client: "Jakarta Youth Festival · Y20 Indonesia 2022",
    summary: "The logo and event identity for a youth festival held alongside Indonesia’s Y20 presidency in July 2022.",
    context: [
      "Y20 is the official youth engagement group of the G20. In 2022, during Indonesia’s G20 presidency, the Y20 Summit ran from 17 to 24 July in Jakarta and closed in Bandung under the theme “From Recovery to Resilience”.",
      "Y20 Indonesia worked on four priority areas: Youth Employment, Digital Transformation, a Sustainable and Liveable Planet, and Diversity and Inclusion. Jakarta Youth Festival was a series of activities where young Indonesians could present their work and ideas within those four areas.",
    ],
    approach: [
      "The mark is built from the letters J, Y and F, drawn into a symmetrical, flower-like geometry. It borrows the visual language of the official G20 Indonesia 2022 program, so it sits comfortably next to the Y20 and G20 lockups while still having its own personality.",
      "Deep red and violet gradients, mountain imagery and a crisp white mark carried the logo through posters, speaker announcements and on-stage screens. Alternative concepts were explored before the final direction.",
    ],
    deliverables: ["Logo", "Lockups with Y20 & G20", "Event posters", "Speaker announcements", "Social media"],
    facts: [
      { label: "Y20 Summit", value: "17–24 July 2022" },
      { label: "Priority areas", value: "4" },
    ],
    sources: [
      { label: "Berita Jakarta: Y20 Indonesia Summit 2022 to discuss four priority issues", href: "https://m.beritajakarta.id/en/read/46000/Y20%20Indonesia%20Summit%202022%20to%20Discuss%20Four%20Priority%20Issues" },
      { label: "Green Network Asia: Indonesian youth launched Y20 Indonesia 2022 white paper", href: "https://greennetwork.asia/?p=1205" },
    ],
  },
  jiwajiwa: {
    year: "2025",
    client: "JiwaJiwa",
    summary: "A calm, warm key visual and brand for a talent agency built around mental health and wellbeing.",
    context: [
      "JiwaJiwa calls itself “a home for every story and feeling”. It is a talent management agency focused on mental health and wellbeing. Jiwa means soul or psyche in Indonesian, and the doubled name reads as one soul meeting another.",
    ],
    approach: [
      "The mark is a soft, looping knot set next to a bookish serif wordmark. It reads as two forms holding each other, which is the brand idea in a single shape.",
      "The palette sits entirely in blues, from a pale Baby Blue Eyes to a near-navy Deep Blue, so even the loudest layouts stay calm. Organic leaf-like patterns, open landscapes and warm portraits of the agency’s talent carry the line “Make the World Mentally Healthy” across social and print.",
    ],
    deliverables: ["Logo", "Key visual", "Colour system", "Social media templates", "Talent cards"],
    palette: [
      { name: "Slate Blue", hex: "#5D67D9" },
      { name: "Violet-Blue", hex: "#333FAD" },
      { name: "Baby Blue Eyes", hex: "#9ECEFF" },
      { name: "Deep Blue", hex: "#0D145B" },
    ],
  },
  "yayasan-bumn": {
    year: "2024",
    client: "Yayasan BUMN",
    summary: "A reconcept of the state-owned enterprises’ foundation identity, built on five pillars drawn from “Indonesia Raya”.",
    context: [
      "Yayasan BUMN Untuk Indonesia is the social foundation operating under Indonesia’s Ministry of State-Owned Enterprises, providing social, humanitarian and religious assistance. It was relaunched on 5 July 2024 in Jakarta under the theme “Membangun Jiwa Raga dan Alam untuk Indonesia”, with a new focus on green issues and maternal and child health.",
      "The identity was developed as a reconcept in 2024 to give that relaunch a clearer, more modern face.",
    ],
    approach: [
      "The anthem “Indonesia Raya” asks the nation to build its soul and its body. The identity turns that into five pillars, each with its own simple icon: Jiwa Raga (soul and body, a heart), Pikiran (mind, a book), Alam (nature, a leaf), Bangsa (nation, a flag) and Hidup (life, a sun).",
      "The five icons lock together into a compact, modular mark in navy and teal next to a light geometric wordmark. The mark can be taken apart into the pillars for programs, or used whole as the foundation’s signature.",
    ],
    deliverables: ["Logo reconcept", "Five-pillar icon system", "Brand guidelines", "Key visual"],
    facts: [
      { label: "Relaunch", value: "5 July 2024" },
      { label: "Pillars", value: "5" },
    ],
    sources: [
      { label: "Republika: Relaunching Yayasan BUMN", href: "https://ekonomi.republika.co.id/berita/sg6rt8484/relaunching-yayasan-bumn-menteri-erick-dorong-transformasi" },
      { label: "Filantropi Indonesia: Yayasan BUMN Untuk Indonesia", href: "https://filantropi.or.id/en/anggota/yayasan-bumn-untuk-indonesia-id/" },
    ],
  },
  "gdsc-sampoerna-university": {
    year: "2021–2022",
    client: "Google Developer Student Clubs, Sampoerna University",
    role: "Organization Leader",
    summary: "Running the campus developer club and designing the whole year of workshop and recruitment content myself.",
    context: [
      "Google Developer Student Clubs are university community groups for students interested in Google developer technologies. The Sampoerna University chapter ran workshops, study jams and info sessions, including sessions for the Google Solution Challenge.",
      "As the organization’s leader, I ran the club and set its visual language.",
    ],
    approach: [
      "The base is Google’s own brand guidelines: the four brand colours, rounded cards and friendly flat illustration. On top of that I added our own patterns and layouts so the chapter had a recognisable voice of its own.",
      "Each workshop track has a colour: UI/UX in yellow, web development in green, data science, game development and coding in blue and red. Speaker portraits and illustrations sit on clean white cards, so a long semester of posters reads as one coherent series.",
    ],
    deliverables: ["Workshop posters", "Speaker announcements", "Recruitment campaign", "Social media system"],
    sources: [
      { label: "GDSC Sampoerna University on the GDG community platform", href: "https://gdsc.community.dev/events/details/developer-student-clubs-sampoerna-university-presents-info-session-for-google-solution-challenge-collab-event/" },
    ],
  },
  "tedx-sampoerna-2022": {
    year: "2022",
    client: "TEDxSampoernaUniversity",
    summary: "Retro, print-inspired campaign and proposal design for the 2022 edition of the campus TEDx event.",
    context: [
      "TEDx events are independently organised local events licensed by TED. TEDxSampoernaUniversity is organised at Sampoerna University in Jakarta with the student executive board, and runs as a yearly event.",
    ],
    approach: [
      "The 2022 look borrows from old media and print: halftone pop-art figures, script lettering, ticket-stub graphics and torn paper on a bold TED red. Several font families are mixed on purpose, as an old newspaper ad would.",
      "The system carried the full ticketing funnel, from early-bird to presale and normal pricing, as well as the event rundown, a “How to Enjoy” guide and the sponsorship proposal.",
    ],
    deliverables: ["Campaign key visual", "Ticketing posts", "Event rundown", "Sponsorship proposal"],
  },
  "a-new-dawn": {
    client: "A New Dawn",
    summary: "Logo and social content for a movement within the campus student organisations.",
    context: [
      "A New Dawn was a movement across our campus student organisations, built to bring them together under a shared purpose.",
    ],
    approach: [
      "The logo is an art-deco sunrise inside an arch, drawn as a single-weight line. Dramatic black-and-white photography and epic illustrations carry the feed, so every post feels like a poster about unity and ambition.",
    ],
    deliverables: ["Logo", "Social media", "Recruitment posts"],
  },
  "centennialz-black": {
    year: "2022",
    client: "CentennialZ",
    summary: "The “Black Period”: a serious, typographic social presence for a youth organisation in transition.",
    context: [
      "CentennialZ’s design changes with each era of the organisation. The “Black Period” marked its transition in 2022.",
    ],
    approach: [
      "The feed is built in black and white: heavy condensed headlines, monochrome photography and small ornaments. Programs such as Biru Voices 2022, Bakti Sosial and open recruitment all speak in the same voice. The restraint made the organisation read as modern and serious.",
    ],
    deliverables: ["Social media system", "Event posters", "Recruitment campaign"],
  },
  "centennialz-blue": {
    year: "2022",
    client: "CentennialZ",
    summary: "The “Blue & White Period”: a brighter rebirth for the same organisation, with a company profile to match.",
    context: [
      "After the Black Period, the organisation’s rebirth in 2022 needed a lighter, more optimistic face.",
    ],
    approach: [
      "Clean white space and a confident cobalt blue replace the black. The logo is a simplified mark set in a geometric sans. The company profile and social templates share one modular grid, so content can be produced quickly without losing consistency.",
    ],
    deliverables: ["Company profile", "Logo", "Social media"],
  },
  "bem-km-su-pandavas": {
    client: "BEM KM Sampoerna University, Pandavas Cabinet",
    summary: "An elegant, heraldic identity for a student executive board cabinet.",
    context: [
      "BEM KM is the student executive board of Sampoerna University, and each cabinet takes its own name. The Pandavas cabinet takes its name from the five Pandava brothers of the Mahabharata.",
    ],
    approach: [
      "A gold horse emblem on deep green sets an elegant, almost heraldic tone. A tight palette and consistent framing across portraits, announcements and publications built a strong cabinet image over the term.",
    ],
    deliverables: ["Cabinet identity", "Social media", "Publications"],
  },
  ajakgerak: {
    client: "#AjakGerak",
    summary: "Almost two years of social media and branding for a national youth-community program.",
    context: [
      "#AjakGerak is a program initiated in 2020 by Ayu Kartika Dewi, then Special Staff to the President of Indonesia. It supports youth communities working to develop Indonesia with mentoring and mini-grants, in themed periods such as distance learning, youth and democracy, and women’s empowerment.",
    ],
    approach: [
      "Across almost two years, the feed evolved through iteration: a purple and green system, bold numerals for impact stats and reusable templates for mentoring, scholarship and community calls. Each round improved both the content quality and how fast the team could produce it.",
    ],
    deliverables: ["Social media system", "Campaign templates", "Brand refresh"],
    sources: [
      { label: "Cabinet Secretariat of the Republic of Indonesia: President’s Special Staffer invites youth to join #AjakGerak", href: "https://setkab.go.id/en/presidents-special-staffer-invites-youth-to-join-ajakgerak-program/" },
    ],
  },
};
