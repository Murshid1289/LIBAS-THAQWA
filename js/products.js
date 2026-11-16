/**
 * LIBAS THAQWA - Luxury Islamic Menswear
 * Product Catalog Data & Configuration
 */

const PRODUCTS_DATA = [
  {
    id: "LT-01",
    name: "Al-Malaki Emirati Kandura",
    arabicName: "القميص الإماراتي الملكي",
    category: "emirati",
    price: 420,
    originalPrice: 495,
    badge: "Bestseller",
    rating: 5.0,
    reviewsCount: 142,
    image: "assets/images/product-emirati-kandura.jpg?v=5.0",
    fabric: "100% Japanese Toyobo Cotton (Grade A)",
    cut: "Traditional Emirati with Handcrafted Tarbousha",
    description: "Our signature Emirati Kandura honors centuries of Gulf sartorial tradition. Tailored from authentic Japanese Toyobo cotton known for its fluid drape, cooling breathability under desert warmth, and immaculate wrinkle-resistant finish.",
    features: [
      "Traditional collarless round neck with buttonless placket",
      "Signature hand-braided Tarbousha (removable silk-finish tassel)",
      "Seamless hidden internal side pockets & smartphone compartment",
      "Reinforced double-stitch hem for durability and flawless posture"
    ],
    colors: [
      { name: "Alabaster White", hex: "#FFFFFF" },
      { name: "Pearl Ivory", hex: "#F8F5EC" },
      { name: "Desert Sand", hex: "#E7DCBF" },
      { name: "Slate Mist", hex: "#D6D9DC" }
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-02",
    name: "Al-Sultani Omani Jubbah",
    arabicName: "الجبة العمانية السلطانية",
    category: "omani",
    price: 480,
    originalPrice: 560,
    badge: "Royal Edition",
    rating: 4.9,
    reviewsCount: 98,
    image: "assets/images/product-omani-jubbah.jpg?v=5.0",
    fabric: "Egyptian Giza 87 Extra-Long Staple Cotton",
    cut: "Royal Omani Embroidered Collar & Chest",
    description: "The epitome of Muscat nobility. Each piece features meticulously hand-embroidered neckline and placket detailing woven with subtle metallic threads, delivering regal poise for Eid, weddings, and formal diplomacy.",
    features: [
      "Intricate hand-stitched floral and geometric Omani collar embroidery",
      "Front-side short tassel (Farakha) with scented thread weave",
      "Breathable Egyptian cotton with natural silky sheen",
      "Custom tailored cuffs with matching embroidery accent"
    ],
    colors: [
      { name: "Ivory Cream", hex: "#FAF5EA" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Sage Mist", hex: "#D2D9CE" },
      { name: "Midnight Teal", hex: "#153331" }
    ],
    sizes: ["52", "54", "56", "58", "60"],
    inStock: true
  },
  {
    id: "LT-03",
    name: "Al-Fakher Saudi Kamees",
    arabicName: "الثوب السعودي الفاخر",
    category: "saudi",
    price: 395,
    originalPrice: 450,
    badge: "Classic Fit",
    rating: 4.9,
    reviewsCount: 115,
    image: "assets/images/product-saudi-kamees.jpg?v=5.0",
    fabric: "Japanese Poly-Cotton Silk-Touch Weave",
    cut: "Structured Saudi Stand-Up Collar & French Cuffs",
    description: "Sharply structured and undeniably commanding. Tailored with a stiffened stand collar, immaculate button placket, and French double-cuffs designed for luxury cufflinks.",
    features: [
      "Stiff dual-layer stand collar that maintains sharp silhouette all day",
      "French double cuffs with dual buttonholes for gold cufflinks",
      "Crisp front chest pocket with pen slot",
      "Wrinkle-proof Japanese high-twist yarn"
    ],
    colors: [
      { name: "Crisp Arctic White", hex: "#FFFFFF" },
      { name: "Warm Alabaster", hex: "#F6F3EC" },
      { name: "Natural Flax", hex: "#E8E1D3" }
    ],
    sizes: ["54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-04",
    name: "Al-Amiri Royal Ceremonial Bisht",
    arabicName: "البشت الأميري الملكي المطرز",
    category: "omani",
    price: 680,
    originalPrice: 790,
    badge: "Royal Edition",
    rating: 5.0,
    reviewsCount: 89,
    image: "assets/images/product-royal-bisht.jpg?v=7.0",
    fabric: "Ceremonial Sky-Blue Wool with 24K Gold Zari & Sfifa Embroidery",
    cut: "Imperial Open-Front Bisht with Handcrafted Gold Tassels (Qasab)",
    description: "An imperial statement of Gulf and Andalusian sartorial majesty. Woven from breathable royal sky-blue ceremonial cloth, lavishly framed by master-artisan pure gold metallic Zari & Sfifa embroidery along the lapels, collar, and cuffs. Accented by authentic hand-twisted gold tassels for Eid, royal weddings, and diplomatic councils.",
    features: [
      "Master-artisan 24K gold metallic Zari and braided Sfifa trim",
      "Hand-braided dual gold tassels (Qasab & Zari) with front closure loop",
      "Tailored for layering over pristine Emirati and Saudi thobes",
      "Featherweight ceremonial drape with wrinkle-resistant structure"
    ],
    colors: [
      { name: "Royal Sky Blue", hex: "#7BA4D9" },
      { name: "Midnight Navy", hex: "#1A2B4C" },
      { name: "Imperial Ivory", hex: "#FAF6EE" },
      { name: "Onyx Black", hex: "#1A1A1A" }
    ],
    sizes: ["54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-05",
    name: "Al-Nukhba Royal Navy Contrast-Trim Thobe",
    arabicName: "الثوب الكحلي الملكي بتطريز الحواف الأبيض",
    category: "thobes",
    price: 430,
    originalPrice: 510,
    badge: "Exclusive Cut",
    rating: 5.0,
    reviewsCount: 112,
    image: "assets/images/product-royal-navy-thobe.jpg?v=1.0",
    imageFit: "cover",
    fabric: "Japanese High-Twist Wrinkle-Free Cotton-Poly Weave (Royal Navy)",
    cut: "Mandarin Collar with Asymmetric Button Placket & Crisp White Piping",
    description: "A distinguished contemporary statement in modern Islamic menswear. Tailored in deep royal navy blue with immaculate white piping along the rounded collar, chest pocket, and the signature asymmetrical self-covered button front placket.",
    features: [
      "Mandarin stand collar finished with crisp white contrast piping",
      "Asymmetric front placket adorned with matching self-covered buttons",
      "Reinforced tailored chest pocket with white piping border",
      "Dual deep side slit pockets tailored for effortless everyday utility",
      "Wrinkle-defying luxury weave delivering a fluid, dignified silhouette"
    ],
    colors: [
      { name: "Royal Navy & White", hex: "#162A45" }
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-09",
    name: "Al-Maghribi Hooded Royal Jalabiya",
    arabicName: "الجلابية المغربية الملكية ذات القلنسوة",
    category: "thobes",
    price: 440,
    originalPrice: 520,
    badge: "New Arrival",
    rating: 5.0,
    reviewsCount: 78,
    image: "assets/images/product-moroccan-hooded.jpg",
    imageFit: "cover",
    fabric: "Premium Matte Poly-Silk with High-Definition White Piping",
    cut: "Authentic Moroccan Hooded Cut with Clean Contrast Piping & Central Trim",
    description: "An iconic fusion of Andalusian dignity and Moroccan sartorial grace. Tailored in deep obsidian black with crisp white piping lining the hood, sleeves, and vertical front placket. Features a structured hood that drapes gracefully over the shoulders.",
    features: [
      "Tailored deep hood with contrast white binding",
      "Smooth glide front closure with reinforced vertical placket",
      "Dual discreet deep side pockets with interior pocket access",
      "Silky touch, non-static fabric with graceful evening drape"
    ],
    colors: [
      { name: "Obsidian Black & White", hex: "#1A1A1A" }
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-11",
    name: "Al-Hadith Modern Executive Saudi Thobe",
    arabicName: "الثوب السعودي العصري ذو الخطوط الرمادية",
    category: "saudi",
    price: 410,
    originalPrice: 480,
    badge: "Modern Executive",
    rating: 4.9,
    reviewsCount: 94,
    image: "assets/images/product-urban-saudi-black.jpg",
    imageFit: "cover",
    fabric: "Japanese Wrinkle-Free High-Twist Gabardine Blend",
    cut: "Mandarin Collar with Dual Graphite Stripe Accents",
    description: "A contemporary masterpiece for the modern Muslim professional. Deep obsidian black fabric highlighted by minimalist dual graphite-grey stripes across the stand collar, chest pocket, and dual-button cuffs.",
    features: [
      "Minimalist double graphite stripe accents on collar, pocket, and cuffs",
      "Formal Mandarin collar with precision metallic-accented buttons",
      "Structured silhouette that stays crisp without daily ironing",
      "Interior hidden pen slot and reinforced pocket welt"
    ],
    colors: [
      { name: "Midnight Black & Slate Grey", hex: "#1A1A1A" }
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    inStock: true
  },
  {
    id: "LT-10",
    name: "Makkah Al-Mukarramah Premium Ihram Set",
    arabicName: "إحرام مكة المكرمة الفاخر للحج والعمرة",
    category: "ihram",
    price: 195,
    originalPrice: 240,
    badge: "Sacred Edition",
    rating: 5.0,
    reviewsCount: 310,
    image: "assets/images/product-ihram-hajj.jpg",
    imageFit: "cover",
    fabric: "100% Zero-Twist High-Absorbency Organic Egyptian Cotton (1400 GSM Set)",
    cut: "Seamless 2-Piece Hajj & Umrah Towels (Rida & Izar)",
    description: "Consecrated for your sacred pilgrimage. Woven from 100% unstitched, zero-twist organic Egyptian combed cotton. Exceptionally lightweight yet completely non-transparent, designed to keep pilgrims cool under the blazing sun of Mina and Arafat.",
    features: [
      "100% compliant with Sharia pilgrimage requirements (Zero stitches/hems)",
      "High thermal regulation & rapid moisture absorption",
      "Thick waffle texture ensuring non-slip hold with pilgrimage belt",
      "Includes protective moisture-sealed travel bag"
    ],
    colors: [
      { name: "Pristine Pilgrim White", hex: "#FFFFFF" }
    ],
    sizes: ["Standard Pilgrim Set (110cm × 220cm × 2)"],
    inStock: true
  },
  {
    id: "LT-06",
    name: "Royal Shemagh & Ather Perfume Set",
    arabicName: "طقم شماغ فاخر مع عطر أثير",
    category: "accessories",
    price: 340,
    originalPrice: 395,
    badge: "Luxury Gift Set",
    rating: 4.9,
    reviewsCount: 168,
    image: "assets/images/product-shemagh-ather-set.jpg",
    imageFit: "contain",
    fabric: "100% High-Grade Jacquard Cotton & Natural Wool",
    cut: "Royal Shemagh, Agal & Ather EDP 100ml",
    description: "Distinguished luxury presentation pairing a royal red-and-white jacquard Shemagh and hand-tied wool Agal with the prestigious Ather Eau de Parfum (100ml flacon).",
    features: [
      "Woven with symmetric geometric borders and crimson red thread",
      "Flexible, memory-holding double-ring wool Agal",
      "Ather Eau de Parfum 100ml flacon in signature luxury box",
      "Delivered in Libas Thaqwa gold-embossed presentation chest"
    ],
    colors: [
      { name: "Classic Crimson & White", hex: "#9E2A2B" },
      { name: "Pure White Ghutra", hex: "#FFFFFF" }
    ],
    sizes: ["55\"", "58\"", "60\""],
    inStock: true
  },
  {
    id: "LT-12",
    name: "Al-Imarat Handcrafted Leather Naal Sandals",
    arabicName: "الحذاء الإماراتي الجلدي الفاخر (النعل)",
    category: "footwear",
    price: 320,
    originalPrice: 380,
    badge: "Artisan Handcrafted",
    rating: 4.9,
    reviewsCount: 112,
    image: "assets/images/product-emirati-naal-sandals.jpg",
    imageFit: "contain",
    fabric: "Genuine Embossed Calf Leather with Memory Foam Footbed",
    cut: "Traditional GCC Open-Toe Dual-Band Naal with Cushioned Sole",
    description: "The quintessence of Khaleeji footwear. Handcrafted from textured cream calfskin leather embossed with geometric motifs and crowned with a bespoke metallic emblem. Built with orthopedic memory foam padding for effortless all-day wear at mosque, weddings, and formal majlis.",
    features: [
      "Supple embossed genuine calf leather upper with hand-stitched welt",
      "Dual-density memory foam footbed with arch support",
      "Slip-resistant rubber outsole for marble and carpeted floors",
      "Signature Libas Thaqwa metallic buckle accent"
    ],
    colors: [
      { name: "Cream Alabaster & Camel Tan", hex: "#F3EDE2" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    inStock: true
  },
  {
    id: "LT-13",
    name: "Al-Malaki Ornate Crystal Itr Decanter",
    arabicName: "قارورة عطر ملكية من الكريستال والذهب الخالص",
    category: "accessories",
    price: 260,
    originalPrice: 320,
    badge: "Limited Luxury",
    rating: 5.0,
    reviewsCount: 64,
    image: "assets/images/product-royal-attar-decanter.jpg",
    imageFit: "contain",
    fabric: "Hand-Blown Bohemian Amethyst Crystal & 24K Gold Filigree",
    cut: "Imperial Palace Itr & Oud Applicator Decanter (50ml)",
    description: "A breathtaking collector's jewel for your dressing table or bridal gift chest. Mouth-blown royal purple crystal adorned with arabesque 24K gold filigree leaves, topped with a sculptured flame-cut crystal applicator wand.",
    features: [
      "Heavy-base hand-blown deep purple crystal flacon",
      "Intricate 24K gold leaf scrollwork fired into glass for permanent luster",
      "Precision glass wand for applying pure Dehn Al Oud and Itr to collars & wrists",
      "Arrives in a silk-lined emerald velvet presentation chest"
    ],
    colors: [
      { name: "Imperial Amethyst & 24K Gold", hex: "#4B0082" }
    ],
    sizes: ["50ml Collector Flacon"],
    inStock: true
  },
  {
    id: "LT-14",
    name: "Artisanal Heritage Kufi & Topi Set (4 Styles)",
    arabicName: "طقم القلانس والكوفيات التقليدية المطرزة يدوياً",
    category: "accessories",
    price: 180,
    originalPrice: 220,
    badge: "Heritage Set",
    rating: 4.9,
    reviewsCount: 185,
    image: "assets/images/product-kufi-topi-grid.jpg?v=2.0",
    imageFit: "contain",
    fabric: "Pure Mercerized Cotton & Silk Thread Embroidery",
    cut: "Set of 4 Islamic Caps (Omani Silver, Sky Blue, Pleated Madrasa, Classic White)",
    description: "A versatile four-piece wardrobe of authentic Islamic headwear. Includes the celebrated Omani silver-embroidered Kufi, festive sky-blue floral cap, traditional wrapped pleated Madrasa topi, and crisp structured pure white prayer cap.",
    features: [
      "4 distinct styles for Friday Jummah, Eid, Dars classes, and daily prayers",
      "Firm yet breathable construction with sweat-absorbent cotton sweatband",
      "Dense needlework that retains shape wash after wash",
      "Presented in a protective Libas Thaqwa dust pouch"
    ],
    colors: [
      { name: "Multi-Pack: Silver, Sky Blue, Lilac, Pure White", hex: "#FFFFFF" }
    ],
    sizes: ["54 cm", "56 cm", "58 cm", "60 cm"],
    inStock: true
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Sultan Al Nuaimi",
    location: "Downtown Dubai, UAE",
    verified: true,
    rating: 5,
    date: "November 2026",
    title: "Unmatched tailoring and drape!",
    text: "I have been ordering my Eid and daily office Kanduras from Libas Thaqwa since 2020. The Japanese Toyobo fabric stays crisp in Dubai heat and the Tarbousha finish is perfection. Masterclass in Gulf menswear."
  },
  {
    id: 2,
    name: "Sheikh Mohammed Al Qasimi",
    location: "Al Majaz, Sharjah, UAE",
    verified: true,
    rating: 5,
    date: "October 2026",
    title: "The standard for luxury Kanduras",
    text: "The bespoke fitting service is unmatched. Their tailor visited my office in DIFC, took 14 precise measurements, and the Kanduras arrived within 4 days. Absolutely immaculate stitching."
  },
  {
    id: 3,
    name: "Dr. Rashid Al Mansoori",
    location: "Al Bateen, Abu Dhabi, UAE",
    verified: true,
    rating: 5,
    date: "November 2026",
    title: "Best Omani Jubbah outside of Muscat",
    text: "The embroidery along the neckline of the Sultani Jubbah is authentic, subtle, and truly royal. Highly recommended for formal occasions and Friday prayers."
  }
];
