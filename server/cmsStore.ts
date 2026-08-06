import fs from "fs";
import path from "path";
import { brandImages, statsData, servicesData, projectsData, processSteps, testimonialsData, blogData, careersData, galleryData } from "../src/data";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "cms_database.json");

// Define complete CMS Data Types
export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft" | "scheduled";
  seoTitle: string;
  metaDescription: string;
  order: number;
  updatedAt: string;
}

export interface CMSMediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: string;
  dimensions?: string;
  uploadedAt: string;
  folder?: string;
}

export interface CMSNavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  children?: CMSNavigationItem[];
}

export interface CMSFAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CMSPartner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface CMSFormSubmission {
  id: string;
  type: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  projectType?: string;
  budgetRange?: string;
  spaceDescription?: string;
  preferences?: string;
  aiReport?: any;
  status: "unread" | "read" | "archived";
  createdAt: string;
}

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Editor" | "Author" | "Viewer";
  avatar?: string;
  passwordHash: string; // stored for auth validation
  lastLogin?: string;
  createdAt: string;
}

export interface CMSAuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

export interface CMSDatabase {
  pages: CMSPage[];
  hero: {
    badge: string;
    headlinePart1: string;
    headlineGold: string;
    headlinePart2: string;
    subheading: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundImage: string;
    videoUrl?: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    foundingYear: string;
    studioLocation: string;
    images: string[];
    teamMembers: Array<{
      id: string;
      name: string;
      role: string;
      desc: string;
      image: string;
      email?: string;
      phone?: string;
      social?: { linkedin?: string; twitter?: string; instagram?: string };
    }>;
  };
  services: any[];
  projects: any[];
  processSteps: any[];
  testimonials: any[];
  partners: CMSPartner[];
  faqs: CMSFAQItem[];
  blog: any[];
  careers: any[];
  gallery: any[];
  stats: any[];
  media: CMSMediaItem[];
  navigation: {
    headerMenu: CMSNavigationItem[];
    footerMenu: CMSNavigationItem[];
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    openingHours: string;
    googleMapsEmbedUrl: string;
    socialLinks: {
      instagram: string;
      linkedin: string;
      facebook: string;
      twitter: string;
      youtube?: string;
    };
  };
  footer: {
    aboutText: string;
    copyrightText: string;
    tagline: string;
  };
  settings: {
    siteName: string;
    siteDescription: string;
    logoUrl: string;
    faviconUrl: string;
    primaryColor: string;
    contactEmail: string;
    enableAiQuoteAdvisor: boolean;
    googleAnalyticsId: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
    ogImage: string;
    canonicalBaseUrl: string;
  };
  submissions: CMSFormSubmission[];
  users: CMSUser[];
  auditLogs: CMSAuditLog[];
}

// Ensure DATA directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed dataset
const initialSeedData: CMSDatabase = {
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
    primaryButtonText: "Explore Projects",
    primaryButtonLink: "portfolio",
    secondaryButtonText: "Consult AI Space Planner",
    secondaryButtonLink: "quote-advisor",
    backgroundImage: brandImages.hero,
    videoUrl: ""
  },
  about: {
    badge: "The Ginosko Legacy",
    title: "Mastering Wood & Concrete with Precision Integrity",
    description: "Founded on absolute devotion to architectural perfection, Ginosko Furniture & Construction fuses centuries-old timber joinery traditions with modern European civil engineering. From our state-of-the-art woodwork atelier in Lagos, we craft custom dining monuments, bespoke kitchens, and turnkey structural villas.",
    foundingYear: "2016",
    studioLocation: "Lekki & Victoria Island, Lagos, Nigeria",
    images: [
      brandImages.diningTable,
      brandImages.modernVilla,
      "/src/assets/images/atelier_workshop_cinematic_1783268273759.jpg"
    ],
    teamMembers: [
      {
        id: "team-1",
        name: "John Dangana",
        role: "Chief Finance & Accountant",
        desc: "Leading financial strategy, budgeting, compliance, and reporting to drive sustainable business growth.",
        image: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
        email: "john.dangana@ginosko.com"
      },
      {
        id: "team-2",
        name: "Simon Aseya Atuwa",
        role: "Head Of Project Operation & Site Engineering",
        desc: "A rigorous project manager ensuring flawless safety, schedule compliance, and absolute finishing standards.",
        image: "/src/assets/images/simon_atuwa_screenshot_1783276612257.jpg",
        email: "simon.atuwa@ginosko.com"
      }
    ]
  },
  services: servicesData,
  projects: projectsData,
  processSteps: processSteps,
  testimonials: testimonialsData,
  partners: [
    { id: "part-1", name: "Lagos State Urban Planning", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop" },
    { id: "part-2", name: "Blum European Hardware", logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=200&auto=format&fit=crop" },
    { id: "part-3", name: "Eko Atlantic City", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop" },
    { id: "part-4", name: "Uzoma Holdings", logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop" }
  ],
  faqs: [
    { id: "faq-1", question: "Does Ginosko handle complete architectural design and construction?", answer: "Yes! We are a full-service design-build firm. We handle architectural drafting, site civil engineering, structural concrete, and internal furniture fit-outs." },
    { id: "faq-2", question: "Where is Ginosko's wood manufacturing workshop located?", answer: "Our main timber workshop and joinery factory is located in Lagos, Nigeria, equipped with modern European woodworking machinery and kiln-drying facilities." },
    { id: "faq-3", question: "Can I request custom-built furniture for a single private residence?", answer: "Absolutely. We craft custom dining tables, walk-in closets, kitchen cabinetry, and executive office furniture for individual homeowners and commercial spaces." }
  ],
  blog: blogData,
  careers: careersData,
  gallery: galleryData,
  stats: statsData,
  media: [
    { id: "med-1", name: "Hero Luxury Interior", url: brandImages.hero, type: "image", size: "1.2 MB", dimensions: "1920x1080", uploadedAt: new Date().toISOString() },
    { id: "med-2", name: "Modern Villa Cantilever", url: brandImages.modernVilla, type: "image", size: "2.1 MB", dimensions: "1600x1200", uploadedAt: new Date().toISOString() },
    { id: "med-3", name: "Sculptural Teak Dining Table", url: brandImages.diningTable, type: "image", size: "1.8 MB", dimensions: "1600x1200", uploadedAt: new Date().toISOString() },
    { id: "med-4", name: "Monolith Kitchen", url: brandImages.luxuryKitchen, type: "image", size: "1.5 MB", dimensions: "1600x1200", uploadedAt: new Date().toISOString() },
    { id: "med-5", name: "John Dangana Profile Photo", url: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg", type: "image", size: "850 KB", dimensions: "800x1000", uploadedAt: new Date().toISOString() },
    { id: "med-6", name: "Simon Aseya Atuwa Profile Photo", url: "/src/assets/images/simon_atuwa_screenshot_1783276612257.jpg", type: "image", size: "620 KB", dimensions: "800x1000", uploadedAt: new Date().toISOString() }
  ],
  navigation: {
    headerMenu: [
      { id: "nav-1", label: "About", href: "#about" },
      { id: "nav-2", label: "Services", href: "#services" },
      { id: "nav-3", label: "Portfolio", href: "#portfolio" },
      { id: "nav-4", label: "Process", href: "#process" },
      { id: "nav-5", label: "Blog", href: "#blog" },
      { id: "nav-6", label: "Careers", href: "#careers" },
      { id: "nav-7", label: "Contact", href: "#contact" }
    ],
    footerMenu: [
      { id: "fnav-1", label: "About Atelier", href: "#about" },
      { id: "fnav-2", label: "Bespoke Services", href: "#services" },
      { id: "fnav-3", label: "Project Portfolio", href: "#portfolio" },
      { id: "fnav-4", label: "AI Space Advisor", href: "#quote-advisor" },
      { id: "fnav-5", label: "Insights & Blog", href: "#blog" },
      { id: "fnav-6", label: "Contact Desk", href: "#contact" }
    ]
  },
  contact: {
    address: "Plot 12, Ginosko Creative Atelier, Victoria Island / Lekki Phase 1, Lagos, Nigeria",
    phone: "+234 803 000 9988 / +234 812 345 6789",
    email: "contact@ginoskofurniture.com",
    openingHours: "Mon - Sat: 8:00 AM - 6:00 PM (WAT)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728283728!2d3.4219!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDI1JzE4LjgnRQ!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng",
    socialLinks: {
      instagram: "https://instagram.com/ginoskofurniture",
      linkedin: "https://linkedin.com/company/ginosko-furniture-construction",
      facebook: "https://facebook.com/ginoskofurniture",
      twitter: "https://twitter.com/ginoskodesign",
      youtube: "https://youtube.com/@ginoskodesign"
    }
  },
  footer: {
    aboutText: "Ginosko Furniture & Construction is Nigeria's premier luxury design-build atelier, merging traditional hardwood joinery with modern architectural civil engineering.",
    copyrightText: `© ${new Date().getFullYear()} Ginosko Furniture & Construction Co. All rights reserved.`,
    tagline: "Generational Architectural Elegance & Precision Joinery"
  },
  settings: {
    siteName: "Ginosko Furniture & Construction",
    siteDescription: "Bespoke Luxury Furniture, Master Joinery & Civil Construction in Nigeria.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#D4AF37",
    contactEmail: "contact@ginoskofurniture.com",
    enableAiQuoteAdvisor: true,
    googleAnalyticsId: "G-GINOSKO2026"
  },
  seo: {
    defaultTitle: "Ginosko Furniture & Construction | Luxury Architecture & Joinery",
    defaultDescription: "Premier Nigerian custom furniture manufacturing, luxury kitchen systems, and turnkey architectural villa construction.",
    keywords: "furniture nigeria, luxury construction lagos, custom joinery lekki, ginosko furniture, bespoke kitchen cabinets",
    ogImage: brandImages.hero,
    canonicalBaseUrl: "https://ginosko-app.com"
  },
  submissions: [
    {
      id: "sub-1",
      type: "contact",
      name: "Arc. Emeka Nnamdi",
      email: "emeka.nnamdi@archstudio.ng",
      phone: "+234 802 111 2233",
      subject: "Commercial Fit-out Inquiry for Victoria Island Office",
      message: "We are looking to partner with Ginosko for custom acoustic wood panels and 20 executive desks for our new 5-story office building.",
      status: "unread",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: "sub-2",
      type: "quote",
      name: "Mrs. Folashade Adeleke",
      email: "f.adeleke@luxuryvillas.com",
      phone: "+234 809 888 7766",
      projectType: "Full Villa Turnkey Build",
      budgetRange: "₦50M - ₦100M",
      spaceDescription: "A 4-bedroom contemporary villa in Banana Island featuring double-height teak wood panels and handleless smart kitchen.",
      preferences: "Minimalist teak wood, microcement, warm LED strip lighting",
      aiReport: { executiveSummary: "Bespoke Architectural Proposal generated for Mrs. Adeleke." },
      status: "unread",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ],
  users: [
    {
      id: "usr-superadmin",
      name: "John Dangana",
      email: "admin@ginosko.com",
      role: "Super Admin",
      avatar: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
      passwordHash: "admin123", // Default password for initial access
      createdAt: new Date().toISOString()
    },
    {
      id: "usr-editor",
      name: "Simon Aseya Atuwa",
      email: "simon@ginosko.com",
      role: "Admin",
      avatar: "/src/assets/images/simon_atuwa_screenshot_1783276612257.jpg",
      passwordHash: "ginosko2026",
      createdAt: new Date().toISOString()
    }
  ],
  auditLogs: [
    {
      id: "log-1",
      user: "John Dangana (Super Admin)",
      action: "CMS System Initialization",
      target: "System Database",
      timestamp: new Date().toISOString(),
      details: "Database initialized with full Ginosko site content and initial seed records."
    }
  ]
};

// Data Helper Functions
export function getCMSDatabase(): CMSDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2), "utf8");
      return initialSeedData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read CMS Database file, returning seed:", error);
    return initialSeedData;
  }
}

export function saveCMSDatabase(data: CMSDatabase): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to save CMS Database file:", error);
  }
}

export function addAuditLog(user: string, action: string, target: string, details?: string): void {
  const db = getCMSDatabase();
  const newLog: CMSAuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    user,
    action,
    target,
    timestamp: new Date().toISOString(),
    details
  };
  db.auditLogs.unshift(newLog);
  // Keep last 100 logs
  if (db.auditLogs.length > 100) {
    db.auditLogs = db.auditLogs.slice(0, 100);
  }
  saveCMSDatabase(db);
}
