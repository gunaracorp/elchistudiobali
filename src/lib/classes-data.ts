/**
 * ELCHÍ STUDIO BALI — Official content source of truth.
 * Every fact below is extracted from the company's own published materials
 * (Elchi.pdf class brochure + Elin's Classes workshop brochure).
 * No invented facts. Items marked `note` come verbatim from official docs.
 */

export type ClassInfo = {
  slug: string;
  name: string;
  duration: string;
  minutes: number;
  tagline: string;
  description: string;
  bring?: string;
  note?: string;
  image: string;
  accent: "sky" | "sun" | "coral" | "palm" | "blush" | "terra";
};

export const CLASSES: ClassInfo[] = [
  {
    slug: "travel-drawing",
    name: "Travel Drawing",
    duration: "100 minutes",
    minutes: 100,
    tagline: "Sketch the places you love",
    description:
      "You'll learn essential sketching skills and use pencils and pens to recreate a destination of your choice. This workshop is open to all skill levels — whether you are picking up a pencil for the first time or looking to refine advanced techniques.",
    bring: "Photos on your phone of the place you want to draw",
    image: "/images/class-travel-drawing.jpg",
    accent: "sky",
  },
  {
    slug: "postcards",
    name: "Postcards",
    duration: "100 minutes",
    minutes: 100,
    tagline: "Paint it. Write it. Mail it later.",
    description:
      "Choose your 3 favourite designs from a collection of unique Bali-themed and creative postcards, and bring them to life with colour! Learn basic watercolour techniques and explore other materials, such as acrylic pens and coloured pencils, to create your own unique artworks.",
    note: "Once you're finished, choose one postcard to write a letter to your future self or a loved one. Pick your favourite month, and we'll mail it for you later — a little surprise to create a beautiful memory of your time in Bali.",
    image: "/images/class-postcards.jpg",
    accent: "coral",
  },
  {
    slug: "dog-keychain",
    name: "Dog Keychain",
    duration: "110 minutes",
    minutes: 110,
    tagline: "Your best friend, in miniature",
    description:
      "Make your own dog's face into a unique keychain! In this needle-felting class, you will use felting wool to create a special 3D version of your pup. It is a completely unique, handmade item made by you. Clip it to your keys or bag, so your best friend can travel with you wherever you go.",
    bring: "Photos on your phone of your dog",
    image: "/images/class-dog-keychain.jpg",
    accent: "sun",
  },
  {
    slug: "custom-flip-flop",
    name: "Custom Flip-Flop",
    duration: "60 minutes",
    minutes: 60,
    tagline: "The perfect wearable souvenir",
    description:
      "Give your favorite flip-flops a fresh, stylish new look! Learn how to redesign and recycle them by wrapping the straps in your favorite colors and adding ten special charms to make them completely unique. A fun, creative workshop and the perfect wearable souvenir to take home from your travels.",
    note: "Ankle straps are not included and are available for purchase separately at our studio.",
    image: "/images/class-flipflop.jpg",
    accent: "terra",
  },
  {
    slug: "custom-t-shirt",
    name: "Custom T-shirt",
    duration: "90 minutes",
    minutes: 90,
    tagline: "Wear your own artwork",
    description:
      "Choose your favorite color and size from our selection of shirts, and learn how to paint your own unique design on it. We will also teach you a few creative cutting techniques to completely redesign the shape of your shirt — no sewing required. An easy, simple way to recycle clothing and create a beautiful, custom piece you can wear everywhere.",
    image: "/images/class-tshirt.jpg",
    accent: "palm",
  },
  {
    slug: "creative-flow",
    name: "Creative Flow",
    duration: "90 minutes",
    minutes: 90,
    tagline: "Your project, your pace",
    description:
      "Bring your own art goals and choose any materials or techniques you'd like to explore! Led by Elin, an instructor with 19 years of teaching experience, this relaxed group class lets you work on your own creative project at your own pace — complete beginner or advanced artist, you'll receive personalised guidance throughout the session.",
    note: "Includes at least 20 minutes of one-on-one feedback and guidance.",
    image: "/images/class-creative-flow.png",
    accent: "blush",
  },
];

export const PRIVATE_EXPERIENCES = [
  {
    slug: "private-group",
    name: "Private Group Class",
    lead: "Make it a special occasion to remember",
    body: "Whether it's a hen's party, birthday celebration, team-building event or simply a fun day with friends, Elchí Studio offers private group creative experiences designed to bring people together. Choose from our range of creative classes, or let us create a special customised experience just for your group.",
    how: "To enquire, simply send us your preferred date, the number of participants, and your preferred class or activity — we'll take care of the rest!",
    image: "/images/group-workshop.jpg",
  },
  {
    slug: "private-1on1",
    name: "Private 1:1 Class",
    lead: "Let's create something just for you",
    body: "Can't find a date or time that suits you? Or perhaps you have a specific creative project you'd love to try? Our private lessons are tailored to your interests and ideas. Choose from our existing classes or request something unique. With 19 years of teaching experience, Elin will guide you step by step.",
    how: "To enquire, simply send us your preferred date, time and creative idea.",
    extra: "Duration: 90 minutes",
    image: "/images/gallery-painting.png",
  },
];

export const ELIN = {
  name: "Elin Kim",
  role: "Founder & Lead Instructor",
  greeting: "Hello, Bonjour, 안녕!",
  years: 19,
  languages: ["English", "French", "Korean"],
  bio: [
    "I studied art restoration at École de Condé in Paris and Fine Arts at ESADMM — École Supérieure d'Art et de Design Marseille, France. In addition, I undertook courses in Children's Art Therapy in Korea and obtained certificates in making flower rice cakes and needle felting.",
    "Ever since I started teaching Korean language to French students and art to kids in France, I have accumulated years of experience teaching a diverse range of age groups, from 2 to 80 years old. I have offered numerous private classes and workshops, carefully designing distinct curriculums tailored to each group size — from one-on-one sessions and small groups to large gatherings of up to 50 participants.",
    "I am passionate about seeing my students smile and enjoy their time in class, so I strive to make each session fun and easy to follow. While ensuring an enjoyable learning experience, I also place great importance on achieving excellent final results.",
  ],
  education: [
    { year: "2008–2010", text: "L'École Supérieure d'Art & de Design Marseille (ESADMM)" },
    { year: "2007", text: "L'École de Condé, Paris — Art Restoration" },
    { year: "2006", text: "AAA Paris (Établissement Libre d'Enseignement Supérieur)" },
    { year: "2005", text: "IFALPES Chambéry — École de Langue Française" },
  ],
  certifications: [
    { year: "2022", text: "Certification in Needle Felting" },
    { year: "2020", text: "Certificate III and IV in Fitness" },
    { year: "2018", text: "Certification in Flower Rice Cakes" },
  ],
  experience: [
    { year: "2021–", text: "Owner of 'Elin's Classes'" },
    { year: "2013–2019", text: "Private Tutor in Gangnam, Seoul" },
    { year: "2013", text: "Manager at Education Centre 'MEG'" },
    { year: "2011–2013", text: "Private Art Tutor for High School Students" },
    { year: "2006–2010", text: "Private Art Tutor in France" },
  ],
  clients: [
    "Pinterest", "Bottega Veneta", "Westfield", "Mirvac", "City of Parramatta",
    "Fetch TV", "Korean Cultural Centre AU", "ClassBento", "Lyka",
    "University of Sydney Union", "Ku-ring-gai Council", "Inner West",
    "Sylvania Waters", "Oscher",
  ],
  reviews: "250+ five-star reviews",
};

export const STATS = [
  { value: "19", label: "years of teaching magic" },
  { value: "250+", label: "five-star reviews" },
  { value: "2–80", label: "ages in one studio" },
  { value: "50", label: "max group participants" },
];

export const FAQS = [
  {
    q: "Do I need any art experience?",
    a: "Not at all. Our workshops are open to all skill levels — whether you are picking up a pencil for the first time or looking to refine advanced techniques. Elin guides you step by step so you can effortlessly follow the class and enjoy fantastic results by the end.",
  },
  {
    q: "What should I bring to class?",
    a: "For Travel Drawing, bring photos on your phone of the place you want to draw. For the Dog Keychain class, bring photos of your dog. For everything else — Postcards, Custom Flip-Flop, Custom T-shirt and Creative Flow — just bring yourself and your creativity!",
  },
  {
    q: "How long is each class?",
    a: "Durations vary by workshop: Custom Flip-Flop is 60 minutes, Custom T-shirt is 90 minutes, Creative Flow is 90 minutes, Travel Drawing and Postcards are 100 minutes, and the Dog Keychain class is 110 minutes. Private 1:1 classes run for 90 minutes.",
  },
  {
    q: "Can I book a private group experience?",
    a: "Yes! Whether it's a hen's party, birthday celebration, team-building event or a fun day with friends, we create private group experiences. Send us your preferred date, the number of participants and your preferred class — we'll take care of the rest.",
  },
  {
    q: "Can I request a class that isn't on the list?",
    a: "Absolutely. Our private lessons are tailored to your interests and ideas. Choose from our existing classes or request something unique, and Elin will design a session just for you.",
  },
  {
    q: "What is the postcard surprise?",
    a: "After the Postcards workshop, you choose one postcard to write a letter to your future self or a loved one. Pick your favourite month, and we'll mail it for you later — a little surprise to create a beautiful memory of your time in Bali.",
  },
  {
    q: "Are ankle straps included in the Custom Flip-Flop class?",
    a: "Ankle straps are not included and are available for purchase separately at our studio.",
  },
  {
    q: "What languages are the classes taught in?",
    a: "Elin teaches in English, French and Korean.",
  },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#classes", label: "Classes" },
  { href: "#experiences", label: "Experiences" },
  { href: "#instructor", label: "Elin" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

/** Canonical stat values — labels are localized in i18n. */
export const STAT_VALUES = ["19", "250+", "2–80", "50"] as const;

/** Gallery structure — src/layout only; alt & caption are localized in i18n. */
export const GALLERY_SHOTS = [
  { src: "/images/class-travel-drawing.jpg", span: "sm:col-span-2 sm:row-span-2", h: "aspect-[4/3] sm:aspect-auto sm:h-full" },
  { src: "/images/class-dog-keychain.jpg", span: "", h: "aspect-square" },
  { src: "/images/gallery-painting.png", span: "", h: "aspect-square" },
  { src: "/images/class-flipflop.jpg", span: "", h: "aspect-square" },
  { src: "/images/class-creative-flow.png", span: "", h: "aspect-square" },
  { src: "/images/group-workshop.jpg", span: "sm:col-span-2", h: "aspect-[16/9]" },
  { src: "/images/gallery-studio.png", span: "", h: "aspect-square" },
  { src: "/images/class-tshirt.jpg", span: "", h: "aspect-square" },
] as const;

export const BOOKING_CLASS_OPTIONS = [
  ...CLASSES.map((c) => ({ value: c.slug, label: `${c.name} · ${c.duration}` })),
  { value: "private-group", label: "Private Group Class (custom occasion)" },
  { value: "private-1on1", label: "Private 1:1 Class · 90 minutes" },
];
