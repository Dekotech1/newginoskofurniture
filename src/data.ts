/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ServiceItem, ProcessStep, Testimonial, BlogItem, JobOpening, GalleryItem, StatsItem } from "./types";

// Core brand assets generated specifically for the app
export const brandImages = {
  hero: "/src/assets/images/hero_luxury_interior_1783084190355.jpg",
  diningTable: "/src/assets/images/furniture_dining_set_1783084203450.jpg",
  modernVilla: "/src/assets/images/construction_modern_villa_1783084216230.jpg",
  luxuryKitchen: "/src/assets/images/interior_kitchen_design_1783084228848.jpg",
  commercialLobby: "/src/assets/images/commercial_interior_1783084240479.jpg"
};

export const statsData: StatsItem[] = [
  { id: "stat-1", value: 500, suffix: "+", label: "Completed Projects" },
  { id: "stat-2", value: 300, suffix: "+", label: "Happy Premium Clients" },
  { id: "stat-3", value: 50, suffix: "+", label: "Skilled Craftsmen & Engineers" },
  { id: "stat-4", value: 10, suffix: "+", label: "Years of Crafting Excellence" }
];

export const servicesData: ServiceItem[] = [
  {
    id: "srv-furniture",
    title: "Bespoke Furniture Manufacturing",
    description: "Handcrafted masterworks fusing traditional joinery with clean, contemporary architectural lines.",
    category: "Furniture",
    iconName: "Sofa",
    features: [
      "Luxury Living Room sets & custom sofas",
      "Executive Office furniture & desks",
      "Five-star Hotel room & lobby furniture",
      "Bespoke dining tables & sculptural seating",
      "Custom woodwork, wall paneling, and acoustic panels",
      "Artisan joinery utilizing aged local Mahogany, Teak, and Walnut"
    ]
  },
  {
    id: "srv-kitchen-wardrobes",
    title: "Kitchen & Wardrobe Systems",
    description: "Fully-integrated smart kitchen cabinetry and architectural walk-in closets with premium European hardware.",
    category: "Furniture",
    iconName: "LayoutGrid",
    features: [
      "Custom handleless kitchen cabinetry",
      "Integrated smart storage & blind corner systems",
      "Luxury glass-door walk-in closets with internal LED lighting",
      "TV units, floating credenzas, and vanity consoles",
      "High-durability Quartz, Granite, and Acrylic solid surfaces",
      "Premium soft-close mechanisms & pull-out pantries"
    ]
  },
  {
    id: "srv-residential",
    title: "Luxury Residential Construction",
    description: "Turnkey architectural building services delivering magnificent homes with pristine structural integrity.",
    category: "Construction",
    iconName: "Home",
    features: [
      "Modern minimalist architectural villas",
      "Multi-family luxury duplex complexes",
      "Reinforced concrete structural engineering",
      "Turnkey site planning & architectural blueprints",
      "High-end civil masonry & slab casting",
      "Premium MEP (Mechanical, Electrical, Plumbing) routing"
    ]
  },
  {
    id: "srv-commercial",
    title: "Commercial & Civil Construction",
    description: "State-of-the-art office buildings, high-end retail galleries, and commercial infrastructure designed to command presence.",
    category: "Construction",
    iconName: "Building",
    features: [
      "Modern corporate headquarter construction",
      "Bespoke luxury retail boutique storefronts",
      "Hospitality structures & hotel layout development",
      "Integrated warehouse construction & logistics parks",
      "Advanced structural steel erection",
      "Rigid civil infrastructure and landscape design"
    ]
  },
  {
    id: "srv-fitout",
    title: "Interior Fit-Out & Turnkey Finishing",
    description: "Absolute control of interior space aesthetics, combining custom woodwork, wall paneling, and architectural lighting.",
    category: "Design",
    iconName: "Layers",
    features: [
      "Complete ceiling & gypsum board (POP) designs",
      "Microcement, epoxy, and imported Italian tiling installation",
      "Bespoke wooden acoustic paneling & feature wall claddings",
      "Custom architectural light curation and automation",
      "High-precision doors & bespoke entry-pivoting systems",
      "Turnkey office workspace optimization"
    ]
  },
  {
    id: "srv-pm",
    title: "Project Management & Supervision",
    description: "Professional project steering from soil excavation to custom furniture installation with zero compromise on safety.",
    category: "Design",
    iconName: "Briefcase",
    features: [
      "Meticulous cost-auditing & quantity surveying",
      "Daily construction supervision & safety protocol enforcement",
      "Subcontractor coordination and quality verification",
      "Strict material testing (slump test, steel strength tests)",
      "Detailed progress tracking & client-ready digital reports",
      "Seamless turnkey transition from build to fully-furnished"
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-villa-lekki",
    name: "The Obsidian Pavilion",
    category: "Residential",
    location: "Lekki Phase 1, Lagos",
    description: "A three-level modern architectural villa with clean cantilevered slabs, massive floor-to-ceiling glass paneling, and extensive natural teak finishing.",
    details: "This turnkey residential masterpiece was built by Ginosko Construction, utilizing high-performance reinforced concrete slabs and deep black powder-coated aluminum framing. The interior includes custom double-height walnut wood acoustic panels and integrated smart systems, blurring the line between external tropical landscaping and premium indoor design.",
    image: brandImages.modernVilla,
    year: "2025",
    size: "850 sqm",
    architect: "Ginosko Architecture Studio"
  },
  {
    id: "proj-dining-ikoyi",
    name: "The Sculptural Teak Dining Set",
    category: "Furniture",
    location: "Ikoyi Showroom Project",
    description: "A colossal bespoke dining table crafted from single-slab premium Nigerian Teakwood, showcasing hand-chiseled butterfly joints.",
    details: "Built for a high-end corporate dining room, this furniture piece was milled in Ginosko's specialized woodwork workshop. Using raw timber sourced sustainably from managed forests, our master joiners utilized classical mortise-and-tenon framing to ensure generational durability without a single visible nail.",
    image: brandImages.diningTable,
    year: "2024",
    size: "4.2m Length",
    architect: "M. Banjo, Chief Joiner"
  },
  {
    id: "proj-kitchen-banana",
    name: "The Monolith Smart Kitchen",
    category: "Interior Design",
    location: "Banana Island, Lagos",
    description: "An ultra-minimalist smart kitchen featuring matte-charcoal soft-touch panels, integrated walnut wood inserts, and calacatta marble surfaces.",
    details: "Ginosko Furniture delivered this high-end fit-out kitchen, featuring smart vertical pocket doors that slide open to reveal integrated espresso bars, premium European hardware, and specialized cabinet internal lighting. The handleless drawers operate on a flawless push-to-open servo-drive mechanism.",
    image: brandImages.luxuryKitchen,
    year: "2025",
    size: "65 sqm",
    architect: "Ginosko Interior Design"
  },
  {
    id: "proj-hotel-lobby",
    name: "The Aurelia Executive Lounge",
    category: "Commercial",
    location: "Victoria Island, Lagos",
    description: "A premium business hotel reception and VIP lounge with custom architectural woodwork wall panels and hand-stitched tan leather seating.",
    details: "For this multi-story commercial fit-out, Ginosko designed and manufactured all custom loose and fixed furniture, and installed curved acoustic wood-slat walls. The layout features integrated gold-plated brass profiles and dramatic custom warm strip lights, elevating the hospitality atmosphere to a global standard of corporate luxury.",
    image: brandImages.commercialLobby,
    year: "2024",
    size: "320 sqm",
    architect: "F. Adeleke, Senior Designer"
  },
  {
    id: "proj-residence-abuja",
    name: "The Limestone & Glass Villa",
    category: "Residential",
    location: "Maitama, Abuja",
    description: "A monolithic family estate showcasing raw limestone masonry, cantilevered steel canopies, and a private wooden-deck pool terrace.",
    details: "Ginosko handled the complete architectural revision, civil construction, and interior finishing. Over 120 tons of reinforced concrete and local granite-blend plasters were used, finished with custom white-oak pivoting doors reaching 3.5 meters in height.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    size: "1,200 sqm",
    architect: "Ginosko Construction"
  },
  {
    id: "proj-office-hq",
    name: "Eko FinTech Headquarters",
    category: "Commercial",
    location: "Marina, Lagos",
    description: "A progressive corporate office fit-out with acoustic wood pods, bespoke collaborative desks, and a luxury executive boardroom.",
    details: "A comprehensive design-build project. Ginosko constructed the acoustic partitions, custom steel-and-wood modular workbenches, and manufactured a 20-seat executive board table with built-in hidden cable-management hatches, wireless charging fields, and local walnut veneers.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    size: "1,500 sqm",
    architect: "Ginosko Workspace Labs"
  }
];

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Bespoke Consultation",
    description: "Deep exploration of your design language, spatial program, material aspirations, and budget limits.",
    details: "We host you at our atelier or visit your site to understand the canvas. Our design directors discuss orientation, wood-species selection, fabric grades, or structural expectations, ensuring your intent is fully captured."
  },
  {
    id: 2,
    number: "02",
    title: "Concept Design",
    description: "3D architectural renders, woodwork shop drawings, and curated material boards representing actual textures.",
    details: "Our design team translates discussions into high-fidelity 3D visualizations, wood joinery blueprints, and tangible mood boards containing genuine timber swatches, stone fragments, and lacquer samples."
  },
  {
    id: 3,
    number: "03",
    title: "Planning & Procurement",
    description: "Precise engineering bills, quantity surveying, structural auditing, and premium material sourcing.",
    details: "We draft meticulous bills of quantities (BOQ) and structural timelines. High-grade timbers (Walnut, Iroko, Mahogany) are selected and kiln-dried, and top-tier European hinges and structural steels are procured."
  },
  {
    id: 4,
    number: "04",
    title: "Manufacturing & Construction",
    description: "Precision wood machining, master handcrafted joinery, and core civil-structural building on-site.",
    details: "Bespoke furniture is fabricated in Ginosko's wood manufacturing workshop using precision machinery combined with classic hand-carving. Simultaneously, our civil engineers execute foundation casting or interior brickwork."
  },
  {
    id: 5,
    number: "05",
    title: "Fit-Out & Installation",
    description: "Highly disciplined on-site joinery mounting, structural integration, and premium surface finishing.",
    details: "Our specialized installation crews mount custom wardrobes, kitchen cabinets, and wall paneling. Concrete surfaces receive microcement coats, and custom architectural doors are hung with micro-millimeter precision."
  },
  {
    id: 6,
    number: "06",
    title: "Quality Inspection",
    description: "Rigid standard verification testing of all structures, soft-close hardware, and lacquer finishes.",
    details: "We perform rigorous quality audits. Custom drawers undergo cycle testing, concrete finishes are checked for planar flatness, and varnished woodwork is inspected under raking lights for minor finish imperfections."
  },
  {
    id: 7,
    number: "07",
    title: "Bespoke Delivery",
    description: "Turnkey spatial handover of pristine, fully-detailed structures and custom furnishings.",
    details: "We clean, polish, and unveil your fully realized luxury space. Ginosko hands over your operation manuals, structural guarantees, and wood care guides, initiating our lifetime post-delivery service relationship."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Chidi Uzoma",
    role: "Managing Director",
    company: "Uzoma Holdings",
    comment: "Ginosko redefined my perspective on luxury in Nigeria. The structural concrete villa they built in Lekki, combined with custom Iroko wall paneling, is globally peerless. Their punctuality and craftsmanship are truly exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test-2",
    name: "Sade Alabi",
    role: "Principal Partner",
    company: "Alabi & Co. Estates",
    comment: "Designing five-star hospitality projects requires perfect execution. Ginosko manufactured all executive furniture and custom lobby installations for our boutique hotel. They are undoubtedly the leading woodwork outfit in Lagos.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test-3",
    name: "Engr. Tunde Babalola",
    role: "Chief Executive",
    company: "Bab-Tech Infrastructure",
    comment: "What sets Ginosko apart is their integration. They don't just build the concrete shell; their finishing and fit-out capabilities mean you get a flawless transition from civil masonry directly into high-end furnished space.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

export const blogData: BlogItem[] = [
  {
    id: "blog-1",
    title: "Selecting Premium Hardwoods: The Ginosko Master Joinery Guide",
    excerpt: "An expert exploration into Ginosko's wood curing process and selecting between Mahogany, Teak, and Iroko for high-end coastal Nigerian residences.",
    content: "When crafting bespoke furniture for humid coastal environments like Lagos, selecting and curing the right species of wood is the absolute foundation of durability. In this masterclass guide, we detail how we kiln-dry local Teakwood to an optimal 8% moisture content, preventing future twisting, warping, or cracking. We compare the visual depth of hand-rubbed Walnut against the structural strength of seasoned Nigerian Iroko, providing clients with an insider guide on what to specify for their architectural spaces.",
    date: "June 25, 2026",
    author: "M. Banjo, Workshop Master",
    readTime: "5 min read",
    category: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blog-2",
    title: "The Architecture of Minimalism: Blending Concrete and Natural Timber",
    excerpt: "How modern Lagos luxury homes are incorporating rough civil concrete structures offset by warm natural timber textures to create timeless sanctuary feelings.",
    content: "The modern architectural paradigm in Lekki and Banana Island is shifting away from heavily gilded interiors toward clean, honest materials. We explore how to integrate raw cast-concrete ceilings, floating steel stairs, and microcement floors with the warm, rich organic texture of solid mahogany walls. The key is architectural tension—the coldness of structural masonry balanced perfectly by the warmth of artisanal custom woodwork.",
    date: "May 18, 2026",
    author: "F. Adeleke, Principal Architect",
    readTime: "4 min read",
    category: "Architecture",
    image: brandImages.hero
  },
  {
    id: "blog-3",
    title: "Turnkey Fit-Out: Optimizing Corporate Workspace Productivity",
    excerpt: "How integrating acoustic timber panels, linear light planning, and ergonomic custom modular furniture drastically improves focus in modern financial tech firms.",
    content: "Modern corporate design requires more than rows of identical desks. To attract elite talent, leading fin-tech headquarters in Victoria Island are opting for custom workspace design-builds. Ginosko's Workspace Labs team breaks down how our modular custom workbenches, fitted with concealed power paths, combined with solid white-oak sound-absorbing wall slats, reduce acoustic noise and visual clutter, driving deep focus and collaboration.",
    date: "April 02, 2026",
    author: "A. Ginosko, Director of Projects",
    readTime: "6 min read",
    category: "Commercial Fit-Out",
    image: brandImages.commercialLobby
  }
];

export const careersData: JobOpening[] = [
  {
    id: "job-joiner",
    title: "Senior Master Joiner / Woodworking Artisan",
    department: "Furniture",
    location: "Main Workshop, Lagos",
    type: "Full-Time",
    experience: "7+ Years",
    description: "We are seeking an exceptionally skilled wood craftsman who possesses a masterly understanding of classical joinery (mortise-and-tenon, dovetail, finger joints) and can operate precision European wood machining equipment.",
    requirements: [
      "Mastery in blueprint drafting and wood joinery drawings",
      "Deep expertise in handling seasoned tropical hardwoods (Mahogany, Iroko, Teak)",
      "High proficiency in veneer pressing, wood turning, and expert lacquering",
      "Incredible attention to detail with tolerances under 0.5 millimeters",
      "Strong leadership to guide and mentor apprentice joiners in Ginosko's academy"
    ]
  },
  {
    id: "job-architect",
    title: "Luxury Interior & Architectural Designer",
    department: "Design",
    location: "Ikoyi Atelier, Lagos",
    type: "Full-Time",
    experience: "5+ Years",
    description: "Join our creative design studio to draft world-class residential and commercial architectural interiors. You will translate client consultations into cinematic 3D renders, physical mood boards, and detailed manufacturing drawings.",
    requirements: [
      "Degree in Architecture, Interior Architecture, or Industrial Design",
      "Exceptional portfolio demonstrating high-end minimalist residential or luxury hotel concepts",
      "Advanced mastery of Rhino 3D, AutoCAD, SketchUp, and V-Ray / Corona Renderer",
      "Deep knowledge of premium modern furniture materials, stone slab specifications, and LED integration",
      "Outstanding communication skills for direct executive-client consultations"
    ]
  },
  {
    id: "job-pm",
    title: "Turnkey Project Manager & Site Engineer",
    department: "Management",
    location: "Various Luxury Residential Sites, Lagos",
    type: "Contract",
    experience: "6+ Years",
    description: "We require a highly disciplined, safety-first Site Engineer to manage turnkey luxury villa constructions from excavation to ultimate hand-polished finishing and furniture installation.",
    requirements: [
      "Degree in Civil Engineering, Building Technology, or Project Management",
      "Proven track record of supervising multi-million Naira high-end residential villa projects in Nigeria",
      "Strict enforcement of site safety protocols and structural concrete standards",
      "Expertise in drafting cost-audit reports, material yield checks, and managing project sub-contractors",
      "Exceptional client-management skills with daily visual reporting systems"
    ]
  }
];

export const galleryData: GalleryItem[] = [
  { id: "gal-1", title: "Teak Dining Masterpiece", category: "Furniture", image: brandImages.diningTable, aspect: "square" },
  { id: "gal-2", title: "Luxury Minimalist Living Room", category: "Interior Design", image: brandImages.hero, aspect: "landscape" },
  { id: "gal-3", title: "Monolith Kitchen Cabinets", category: "Furniture", image: brandImages.luxuryKitchen, aspect: "portrait" },
  { id: "gal-4", title: "Aurelia Hotel Lobby Fit-out", category: "Commercial", image: brandImages.commercialLobby, aspect: "landscape" },
  { id: "gal-5", title: "Minimalist Cantilevered Villa", category: "Residential", image: brandImages.modernVilla, aspect: "portrait" },
  { id: "gal-6", title: "Executive Workspace", category: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", aspect: "square" },
  { id: "gal-7", title: "Raw Timber Slabs Curing", category: "Furniture", image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop", aspect: "portrait" },
  { id: "gal-8", title: "Premium Concrete Casting", category: "Residential", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", aspect: "landscape" }
];
