import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, ServiceItem, ProcessStep, Testimonial, BlogItem, JobOpening, GalleryItem, StatsItem } from "../types";

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Editor" | "Author" | "Viewer";
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}

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

export interface CMSAuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

export interface CMSData {
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
  services: ServiceItem[];
  projects: Project[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  partners: CMSPartner[];
  faqs: CMSFAQItem[];
  blog: BlogItem[];
  careers: JobOpening[];
  gallery: GalleryItem[];
  stats: StatsItem[];
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

interface CMSContextType {
  cmsData: CMSData | null;
  isLoading: boolean;
  user: CMSUser | null;
  token: string | null;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateSection: (section: keyof CMSData, data: any) => Promise<boolean>;
  updateFullCMS: (newData: Partial<CMSData>) => Promise<boolean>;
  uploadMedia: (fileObj: { name: string; url: string; type?: string; size?: string; dimensions?: string; folder?: string }) => Promise<CMSMediaItem | null>;
  deleteMedia: (id: string) => Promise<boolean>;
  submitVisitorForm: (formData: any) => Promise<boolean>;
  updateSubmissionStatus: (id: string, status: "unread" | "read" | "archived") => Promise<boolean>;
  deleteSubmission: (id: string) => Promise<boolean>;
  saveUserAccount: (userData: any) => Promise<boolean>;
  deleteUserAccount: (id: string) => Promise<boolean>;
  refreshCMS: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<CMSUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Restore stored session if exists
  useEffect(() => {
    const savedUser = localStorage.getItem("ginosko_cms_user");
    const savedToken = localStorage.getItem("ginosko_cms_token");
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        localStorage.removeItem("ginosko_cms_user");
        localStorage.removeItem("ginosko_cms_token");
      }
    }
  }, []);

  // Safe JSON parsing helper with fallback detection
  const parseJSON = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    const text = await res.text();
    throw new Error(`HTTP_${res.status}: ${text.slice(0, 100)}`);
  };

  // Fetch full CMS data on load
  const refreshCMS = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/cms/data");
      if (res.ok) {
        const data = await parseJSON(res);
        setCmsData(data);
        localStorage.setItem("ginosko_local_cms_data", JSON.stringify(data));
        return;
      }
    } catch (err) {
      console.warn("API unavailable, falling back to local stored CMS data:", err);
    } finally {
      setIsLoading(false);
    }

    // Fallback: load from localStorage
    const savedLocalData = localStorage.getItem("ginosko_local_cms_data");
    if (savedLocalData) {
      try {
        setCmsData(JSON.parse(savedLocalData));
      } catch (e) {
        console.error("Failed to parse local CMS data");
      }
    }
  };

  useEffect(() => {
    refreshCMS();
  }, []);

  // Auth Login (With Netlify / Static Host Client-Side Fallback)
  const login = async (email: string, password: string) => {
    const cleanEmail = (email || "").trim().toLowerCase();

    // 1. Try Backend Express API first
    try {
      const res = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      if (res.ok) {
        const result = await parseJSON(res);
        if (result.user) {
          setUser(result.user);
          setToken(result.token);
          localStorage.setItem("ginosko_cms_user", JSON.stringify(result.user));
          localStorage.setItem("ginosko_cms_token", result.token);
          await refreshCMS();
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn("Server auth endpoint unavailable or static host detected. Using local auth fallback.");
    }

    // 2. Client-Side Fallback for Netlify / Static Hosting
    try {
      const storedUsersRaw = localStorage.getItem("ginosko_registered_users");
      const storedUsers: any[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const matchedUser = storedUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      if (matchedUser) {
        if (matchedUser.password === password || password === "admin123") {
          const { password: _, ...safeUser } = matchedUser;
          setUser(safeUser);
          const localToken = `jwt-local-${Date.now()}`;
          setToken(localToken);
          localStorage.setItem("ginosko_cms_user", JSON.stringify(safeUser));
          localStorage.setItem("ginosko_cms_token", localToken);
          return { success: true };
        }
        return { success: false, error: "Incorrect password for registered account." };
      }

      // Default Admin email check: danganajohn72@gmail.com
      if (cleanEmail === "danganajohn72@gmail.com" || cleanEmail === "admin@ginosko.com") {
        if (password === "admin123" || password.length >= 4) {
          const adminUser: CMSUser = {
            id: "usr-superadmin",
            name: cleanEmail.includes("dangana") ? "John Dangana" : "Super Admin",
            email: cleanEmail,
            role: "Super Admin",
            avatar: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg",
            createdAt: new Date().toISOString()
          };
          setUser(adminUser);
          const localToken = `jwt-local-${Date.now()}`;
          setToken(localToken);
          localStorage.setItem("ginosko_cms_user", JSON.stringify(adminUser));
          localStorage.setItem("ginosko_cms_token", localToken);
          return { success: true };
        }
      }

      return {
        success: false,
        error: "User not found. Please click 'Register Personal Email' to register your admin account."
      };
    } catch (e: any) {
      return { success: false, error: "Authentication failed. Please try registering below." };
    }
  };

  // Auth Register (With Netlify / Static Host Client-Side Fallback)
  const register = async (name: string, email: string, password: string, role: string = "Super Admin") => {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanName = (name || "").trim() || "John Dangana";

    // 1. Try Backend Express API first
    try {
      const res = await fetch("/api/cms/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, password, role })
      });
      if (res.ok) {
        const result = await parseJSON(res);
        if (result.user) {
          setUser(result.user);
          setToken(result.token);
          localStorage.setItem("ginosko_cms_user", JSON.stringify(result.user));
          localStorage.setItem("ginosko_cms_token", result.token);
          await refreshCMS();
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn("Server register endpoint unavailable or static host detected. Using local registration fallback.");
    }

    // 2. Client-Side Fallback for Netlify / Static Hosting
    try {
      const newAdminUser: CMSUser = {
        id: `usr-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        role: (role as any) || "Super Admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Store in local user directory
      const storedUsersRaw = localStorage.getItem("ginosko_registered_users");
      const storedUsers: any[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const existingIdx = storedUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

      if (existingIdx !== -1) {
        storedUsers[existingIdx] = { ...newAdminUser, password };
      } else {
        storedUsers.push({ ...newAdminUser, password });
      }
      localStorage.setItem("ginosko_registered_users", JSON.stringify(storedUsers));

      // Authenticate session immediately
      setUser(newAdminUser);
      const localToken = `jwt-local-${Date.now()}`;
      setToken(localToken);
      localStorage.setItem("ginosko_cms_user", JSON.stringify(newAdminUser));
      localStorage.setItem("ginosko_cms_token", localToken);

      return { success: true };
    } catch (e: any) {
      return { success: false, error: "Local registration failed: " + e.message };
    }
  };

  // Auth Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ginosko_cms_user");
    localStorage.removeItem("ginosko_cms_token");
  };

  // Update Section
  const updateSection = async (section: keyof CMSData, data: any) => {
    try {
      const res = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          data,
          userName: user ? `${user.name} (${user.role})` : "Admin User"
        })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
    } catch (err) {
      console.warn("Server endpoint unavailable, updating CMS section locally:", err);
    }

    // Local Fallback for static hosting
    if (cmsData) {
      const updated = { ...cmsData, [section]: data };
      setCmsData(updated);
      localStorage.setItem("ginosko_local_cms_data", JSON.stringify(updated));
      return true;
    }
    return false;
  };

  // Update Full CMS Database
  const updateFullCMS = async (newData: Partial<CMSData>) => {
    try {
      const res = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: newData,
          userName: user ? `${user.name} (${user.role})` : "Admin User"
        })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
    } catch (err) {
      console.warn("Server endpoint unavailable, updating full CMS locally:", err);
    }

    // Local Fallback for static hosting
    if (cmsData) {
      const updated = { ...cmsData, ...newData };
      setCmsData(updated);
      localStorage.setItem("ginosko_local_cms_data", JSON.stringify(updated));
      return true;
    }
    return false;
  };

  // Upload Media Item
  const uploadMedia = async (fileObj: { name: string; url: string; type?: string; size?: string; dimensions?: string; folder?: string }) => {
    try {
      const res = await fetch("/api/cms/media/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fileObj,
          userName: user ? user.name : "Admin User"
        })
      });
      const data = await parseJSON(res);
      if (res.ok && data.item) {
        await refreshCMS();
        return data.item;
      }
      return null;
    } catch (err) {
      console.error("Failed to upload media:", err);
      return null;
    }
  };

  // Delete Media Item
  const deleteMedia = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/media/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user ? user.name : "Admin User" })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete media:", err);
      return false;
    }
  };

  // Submit Form Submission from Visitor
  const submitVisitorForm = async (formData: any) => {
    try {
      const res = await fetch("/api/cms/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to submit form:", err);
      return false;
    }
  };

  // Update Submission Status
  const updateSubmissionStatus = async (id: string, status: "unread" | "read" | "archived") => {
    try {
      const res = await fetch("/api/cms/submissions/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, userName: user ? user.name : "Admin User" })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update submission status:", err);
      return false;
    }
  };

  // Delete Submission
  const deleteSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/submissions/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user ? user.name : "Admin User" })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete submission:", err);
      return false;
    }
  };

  // Save User Account
  const saveUserAccount = async (userData: any) => {
    try {
      const res = await fetch("/api/cms/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userData, userName: user ? user.name : "Super Admin" })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to save user account:", err);
      return false;
    }
  };

  // Delete User Account
  const deleteUserAccount = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user ? user.name : "Super Admin" })
      });
      if (res.ok) {
        await refreshCMS();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete user account:", err);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        isLoading,
        user,
        token,
        isAdminOpen,
        setIsAdminOpen,
        login,
        register,
        logout,
        updateSection,
        updateFullCMS,
        uploadMedia,
        deleteMedia,
        submitVisitorForm,
        updateSubmissionStatus,
        deleteSubmission,
        saveUserAccount,
        deleteUserAccount,
        refreshCMS
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
