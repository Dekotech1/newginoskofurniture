import { 
  brandImages, 
  statsData, 
  servicesData, 
  projectsData, 
  processSteps, 
  testimonialsData, 
  blogData, 
  careersData, 
  galleryData 
} from "../data";
import { CMSData } from "../context/CMSContext";

export const defaultCMSData: CMSData = {
  pages: [
    { id: "page-1", title: "Home", slug: "/", status: "published", seoTitle: "Ginosko | Luxury Furniture & Turnkey Construction in Nigeria", metaDescription: "Master furniture joinery, luxury interior fit-outs, and architectural construction in Nigeria.", order: 1, updatedAt: new Date().toISOString() },
    { id: "page-2", title: "About Atelier", slug: "/#about", status: "published", seoTitle: "About Ginosko Furniture & Construction", metaDescription: "Learn about our heritage, master craftsmen, and architectural excellence.", order: 2, updatedAt: new Date().toISOString() },
    { id: "page-3", title: "Services", slug: "/#services", status: "published", seoTitle: "Bespoke Furniture & Architectural Services", metaDescription: "Custom woodwork, kitchen systems, residential construction, and interior fit-outs.", order: 3, updatedAt: new Date().toISOString() },
    { id: "page-4", title: "Portfolio", slug: "/#portfolio", status: "published", seoTitle: "Luxury Construction & Furniture Projects", metaDescription: "Explore our portfolio of villas, hotel lounges, and executive workspaces.", order: 4, updatedAt: new Date().toISOString() },
    { id: "page-5", title: "Insights & Blog", slug: "/#blog", status: "published", seoTitle: "Ginosko Design & Woodworking Insights", metaDescription: "Master joinery guides, architectural minimalism, and workspace trends.", order: 5, updatedAt: new Date().toISOString() },
    { id: "page-6", title: "Careers", slug: "/#careers", status: "published", seoTitle: "Join Ginosko Craftsmen Academy", metaDescription: "Career openings for senior joiners, architects, and project site engineers.", order: 6, updatedAt: new Date().toISOString() },
    { id: "page-7", title: "Contact Us", slug: "/#contact", status: "published", seoTitle: "Contact Ginosko Atelier & Head Office", metaDescription: "Get in touch with our design directors for custom consultation.", order: 7, updatedAt: new Date().toISOString() }
  ],
  hero: {
    badge: "Master Furniture & Turnkey Construction",
    headlinePart1: "Crafting Generational",
    headlineGold: "Architectural Elegance",
    headlinePart2: "in Nigeria",
    subheading: "Where bespoke timber joinery meets modern structural civil engineering. We build world-class luxury residences, commercial fit-outs, and custom furniture tailored to distinction.",
    primaryButtonText: "Explore Projects & Portfolio",
    primaryButtonLink: "#portfolio",
    secondaryButtonText: "Interactive Quote Advisor",
    secondaryButtonLink: "#quote-advisor",
    backgroundImage: brandImages.hero
  },
  about: {
    badge: "The Ginosko Atelier & Legacy",
    title: "Master Craftsmen & Civil Structural Engineers",
    description: "At Ginosko Furniture & Construction, we operate at the intersection of precision timber joinery and heavy structural engineering. Founded with an unyielding commitment to perfection, our atelier manufactures bespoke furniture that graces luxury Lagos estates, five-star hotel lobbies, and executive headquarters across Nigeria.",
    foundingYear: "2016",
    studioLocation: "Lagos & Abuja, Nigeria",
    images: [
      brandImages.diningTable,
      brandImages.modernVilla,
      brandImages.luxuryKitchen
    ],
    teamMembers: [
      {
        id: "team-1",
        name: "John Dangana",
        role: "Managing Director & Chief Executive",
        desc: "Pioneering luxury architectural construction and artisan furniture craftsmanship across West Africa.",
        image: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
        email: "danganajohn72@gmail.com",
        phone: "+234 803 000 0000"
      },
      {
        id: "team-2",
        name: "Arch. Farouk Adeleke",
        role: "Head of Architectural Design",
        desc: "Over 14 years shaping minimal modernism, structural concrete cantilevers, and high-end residential layouts.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
        email: "f.adeleke@ginosko.com"
      },
      {
        id: "team-3",
        name: "Master Banjo Michael",
        role: "Director of Woodwork Atelier",
        desc: "Third-generation master joiner specializing in Nigerian Teak, Mahogany kiln curing, and hand mortise joinery.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
        email: "m.banjo@ginosko.com"
      }
    ]
  },
  services: servicesData,
  projects: projectsData,
  processSteps: processSteps,
  testimonials: testimonialsData,
  partners: [
    { id: "part-1", name: "Blum Hardware", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
    { id: "part-2", name: "Julius Berger Civil", logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150&auto=format&fit=crop" },
    { id: "part-3", name: "Hafele Architectural", logo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=150&auto=format&fit=crop" },
    { id: "part-4", name: "Lafarge Cement", logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=150&auto=format&fit=crop" }
  ],
  faqs: [
    { id: "faq-1", question: "Where is your furniture manufacturing workshop located?", answer: "Our main heavy woodwork workshop is based in Lagos with state-of-the-art kiln dryers, CNC routers, and finishing spray booths. We also maintain a studio in Abuja." },
    { id: "faq-2", question: "Do you handle complete turnkey construction from ground up?", answer: "Yes, Ginosko Civil Construction handles soil excavation, reinforced concrete framing, masonry, electrical/plumbing routing, and final interior fit-out." },
    { id: "faq-3", question: "What wood species do you use for custom furniture?", answer: "We specialize in seasoned Nigerian Teak, aged Mahogany, Iroko, Walnut, and imported Oak, all kiln-dried to optimal moisture content." }
  ],
  blog: blogData,
  careers: careersData,
  gallery: galleryData,
  stats: statsData,
  media: [
    { id: "med-1", name: "Luxury Interior Hero", url: brandImages.hero, type: "image", size: "2.4 MB", dimensions: "1920x1080", uploadedAt: new Date().toISOString(), folder: "Hero Banners" },
    { id: "med-2", name: "Teak Dining Set", url: brandImages.diningTable, type: "image", size: "1.8 MB", dimensions: "1920x1280", uploadedAt: new Date().toISOString(), folder: "Furniture" },
    { id: "med-3", name: "Modern Cantilevered Villa", url: brandImages.modernVilla, type: "image", size: "3.1 MB", dimensions: "2048x1365", uploadedAt: new Date().toISOString(), folder: "Projects" },
    { id: "med-4", name: "Smart Monolith Kitchen", url: brandImages.luxuryKitchen, type: "image", size: "2.2 MB", dimensions: "1920x1080", uploadedAt: new Date().toISOString(), folder: "Interior" }
  ],
  navigation: {
    headerMenu: [
      { id: "nav-1", label: "Home", href: "/" },
      { id: "nav-2", label: "About Atelier", href: "#about" },
      { id: "nav-3", label: "Services", href: "#services" },
      { id: "nav-4", label: "Portfolio", href: "#portfolio" },
      { id: "nav-5", label: "Blog & Insights", href: "#blog" },
      { id: "nav-6", label: "Careers", href: "#careers" },
      { id: "nav-7", label: "Contact", href: "#contact" }
    ],
    footerMenu: [
      { id: "fnav-1", label: "Bespoke Joinery", href: "#services" },
      { id: "fnav-2", label: "Kitchen Systems", href: "#services" },
      { id: "fnav-3", label: "Villa Construction", href: "#services" },
      { id: "fnav-4", label: "Commercial Fit-Out", href: "#services" },
      { id: "fnav-5", label: "Privacy Policy", href: "#" },
      { id: "fnav-6", label: "Terms of Service", href: "#" }
    ]
  },
  contact: {
    address: "14B Freedom Way, Lekki Phase 1, Lagos State, Nigeria",
    phone: "+234 803 000 0000",
    email: "info@ginoskoconstruction.com",
    openingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728800186178!2d3.473523!3d6.430097",
    socialLinks: {
      instagram: "https://instagram.com/ginoskoconstruction",
      linkedin: "https://linkedin.com/company/ginosko-construction",
      facebook: "https://facebook.com/ginoskoconstruction",
      twitter: "https://twitter.com/ginosko_ng"
    }
  },
  footer: {
    aboutText: "Ginosko Furniture & Construction is Nigeria's premier atelier for bespoke hardwood joinery, modern architectural villa building, and commercial luxury fit-outs.",
    copyrightText: "© 2026 Ginosko Furniture & Construction Ltd. All rights reserved.",
    tagline: "Generational Architectural Elegance"
  },
  settings: {
    siteName: "Ginosko Furniture & Construction",
    siteDescription: "Luxury Furniture & Turnkey Construction in Nigeria",
    logoUrl: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
    faviconUrl: "/favicon.ico",
    primaryColor: "#D4AF37",
    contactEmail: "danganajohn72@gmail.com",
    enableAiQuoteAdvisor: true,
    googleAnalyticsId: "G-GINOSKO2026"
  },
  seo: {
    defaultTitle: "Ginosko | Luxury Furniture & Turnkey Construction Nigeria",
    defaultDescription: "Master joinery, luxury interior fit-outs, and architectural construction in Nigeria.",
    keywords: "furniture, construction, joinery, lagos, luxury villas, ginosko, nigeria, interior design",
    ogImage: brandImages.hero,
    canonicalBaseUrl: "https://ginoskoconstruction.com"
  },
  submissions: [
    {
      id: "sub-1",
      type: "quote",
      name: "Dr. Chidi Uzoma",
      email: "chidi.uzoma@uzomaholdings.com",
      phone: "+234 802 345 6789",
      projectType: "Luxury Villa & Custom Joinery",
      budgetRange: "₦50m - ₦150m+",
      spaceDescription: "Three-story residential villa requiring complete turnkey construction and bespoke mahogany furniture.",
      status: "unread",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: "sub-2",
      type: "contact",
      name: "Sade Alabi",
      email: "sade@alabiestates.ng",
      phone: "+234 809 123 4567",
      subject: "Boutique Hotel Lobby Fit-Out",
      message: "We need custom acoustic wood panels and reception desks for our new Victoria Island location.",
      status: "read",
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
    }
  ],
  users: [
    {
      id: "usr-superadmin",
      name: "John Dangana",
      email: "danganajohn72@gmail.com",
      role: "Super Admin",
      avatar: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
  ],
  auditLogs: [
    {
      id: "log-1",
      user: "John Dangana",
      action: "System Startup & Initializer",
      target: "CMS Engine",
      timestamp: new Date().toISOString(),
      details: "Ginosko Enterprise CMS session established."
    }
  ]
};
