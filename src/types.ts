/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  category: "Furniture" | "Residential" | "Commercial" | "Interior Design";
  location: string;
  description: string;
  details: string;
  image: string;
  year: string;
  size?: string;
  architect?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: "Furniture" | "Construction" | "Design";
  iconName: string;
  features: string[];
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  image: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: "Construction" | "Design" | "Furniture" | "Management";
  location: string;
  type: "Full-Time" | "Contract" | "Part-Time";
  experience: string;
  description: string;
  requirements: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
}

export interface StatsItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface AdvisorInput {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  spaceDescription: string;
  preferences: string;
}

export interface AdvisorResponse {
  executiveSummary: string;
  conceptAdvisory: string;
  constructionTimeline: string;
  estimatedCostBreakdown: {
    designFees: string;
    materialsCustomWoodwork: string;
    laborAndFitOut: string;
    contingencyTotal: string;
  };
  nextSteps: string;
}
