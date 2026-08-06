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

  // Fetch full CMS data on load
  const refreshCMS = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/cms/data");
      if (res.ok) {
        const data = await res.json();
        setCmsData(data);
      }
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCMS();
  }, []);

  // Auth Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await res.json();
      if (res.ok && result.user) {
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem("ginosko_cms_user", JSON.stringify(result.user));
        localStorage.setItem("ginosko_cms_token", result.token);
        await refreshCMS();
        return { success: true };
      }
      return { success: false, error: result.error || "Login failed" };
    } catch (err: any) {
      return { success: false, error: err.message };
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
      return false;
    } catch (err) {
      console.error("Failed to update section:", err);
      return false;
    }
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
      return false;
    } catch (err) {
      console.error("Failed to update full CMS:", err);
      return false;
    }
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
      const data = await res.json();
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
