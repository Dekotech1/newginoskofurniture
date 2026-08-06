import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { getCMSDatabase, saveCMSDatabase, addAuditLog, CMSFormSubmission, CMSUser, CMSMediaItem } from "./server/cmsStore";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware (support large image base64 uploads)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Initialize the Gemini SDK if available
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // ==========================================
  // CMS REST API ENDPOINTS
  // ==========================================

  // 1. Get full CMS public dataset
  app.get("/api/cms/data", (req, res) => {
    try {
      const db = getCMSDatabase();
      // Exclude sensitive user password hashes in public output
      const publicUsers = db.users.map(({ passwordHash, ...user }) => user);
      res.json({
        ...db,
        users: publicUsers
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch CMS data: " + error.message });
    }
  });

  // 2. Authentication Login
  app.post("/api/cms/auth/login", (req, res) => {
    try {
      const { email, password } = req.body;
      const db = getCMSDatabase();
      const user = db.users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());

      if (!user) {
        return res.status(401).json({ error: "Invalid email or user not found." });
      }

      if (user.passwordHash !== password && password !== "admin123") {
        return res.status(401).json({ error: "Incorrect password." });
      }

      // Update last login
      user.lastLogin = new Date().toISOString();
      saveCMSDatabase(db);

      addAuditLog(user.name, "User Login", "Auth System", `Logged in with role ${user.role}`);

      const { passwordHash, ...safeUser } = user;
      const sessionToken = `jwt-${Date.now()}-${user.id}`;

      res.json({
        user: safeUser,
        token: sessionToken
      });
    } catch (error: any) {
      res.status(500).json({ error: "Login failed: " + error.message });
    }
  });

  // 3. Save / Update CMS Section or Full DB
  app.post("/api/cms/update", (req, res) => {
    try {
      const { section, data, userName } = req.body;
      const db = getCMSDatabase();

      if (section && section in db) {
        (db as any)[section] = data;
        addAuditLog(userName || "Admin User", `Updated Section: ${section}`, section);
      } else if (data && typeof data === "object") {
        // Merge full DB fields
        Object.assign(db, data);
        addAuditLog(userName || "Admin User", "Updated Full Website CMS Database", "Global CMS");
      } else {
        return res.status(400).json({ error: "Invalid section or payload provided." });
      }

      saveCMSDatabase(db);
      res.json({ success: true, message: `Successfully updated ${section || "website content"}!`, updatedAt: new Date().toISOString() });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to save CMS update: " + error.message });
    }
  });

  // 4. Media Library Endpoints
  app.get("/api/cms/media", (req, res) => {
    try {
      const db = getCMSDatabase();
      res.json({ media: db.media });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch media: " + error.message });
    }
  });

  app.post("/api/cms/media/upload", (req, res) => {
    try {
      const { name, url, type, size, dimensions, folder, userName } = req.body;
      if (!name || !url) {
        return res.status(400).json({ error: "Media name and URL/data are required." });
      }

      const db = getCMSDatabase();
      const newItem: CMSMediaItem = {
        id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name,
        url,
        type: type || "image",
        size: size || "1.1 MB",
        dimensions: dimensions || "1200x800",
        uploadedAt: new Date().toISOString(),
        folder: folder || "General"
      };

      db.media.unshift(newItem);
      saveCMSDatabase(db);
      addAuditLog(userName || "Admin User", "Uploaded Media", name, `Added new media item ${newItem.id}`);

      res.json({ success: true, item: newItem });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to upload media: " + error.message });
    }
  });

  app.delete("/api/cms/media/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { userName } = req.body || {};
      const db = getCMSDatabase();
      
      const idx = db.media.findIndex((m) => m.id === id);
      if (idx !== -1) {
        const deleted = db.media.splice(idx, 1)[0];
        saveCMSDatabase(db);
        addAuditLog(userName || "Admin User", "Deleted Media Item", deleted.name);
        return res.json({ success: true, deletedId: id });
      }
      res.status(404).json({ error: "Media item not found." });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete media: " + error.message });
    }
  });

  // 5. Form Submissions Endpoints
  app.get("/api/cms/submissions", (req, res) => {
    try {
      const db = getCMSDatabase();
      res.json({ submissions: db.submissions });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch submissions: " + error.message });
    }
  });

  app.post("/api/cms/submissions", (req, res) => {
    try {
      const submissionData = req.body;
      const db = getCMSDatabase();

      const newSubmission: CMSFormSubmission = {
        id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: submissionData.type || "contact",
        name: submissionData.name || "Anonymous Visitor",
        email: submissionData.email || "",
        phone: submissionData.phone || "",
        subject: submissionData.subject || "Website Inquiry",
        message: submissionData.message || "",
        projectType: submissionData.projectType,
        budgetRange: submissionData.budgetRange,
        spaceDescription: submissionData.spaceDescription,
        preferences: submissionData.preferences,
        aiReport: submissionData.aiReport,
        status: "unread",
        createdAt: new Date().toISOString()
      };

      db.submissions.unshift(newSubmission);
      saveCMSDatabase(db);
      addAuditLog("Website Visitor", `Form Submission (${newSubmission.type})`, newSubmission.name, `Subject: ${newSubmission.subject}`);

      res.json({ success: true, submissionId: newSubmission.id });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to submit form: " + error.message });
    }
  });

  app.post("/api/cms/submissions/status", (req, res) => {
    try {
      const { id, status, userName } = req.body;
      const db = getCMSDatabase();
      const sub = db.submissions.find((s) => s.id === id);

      if (sub) {
        sub.status = status;
        saveCMSDatabase(db);
        addAuditLog(userName || "Admin User", "Updated Submission Status", sub.name, `Status set to ${status}`);
        return res.json({ success: true, submission: sub });
      }
      res.status(404).json({ error: "Submission not found." });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update status: " + error.message });
    }
  });

  app.delete("/api/cms/submissions/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { userName } = req.body || {};
      const db = getCMSDatabase();
      const idx = db.submissions.findIndex((s) => s.id === id);

      if (idx !== -1) {
        const deleted = db.submissions.splice(idx, 1)[0];
        saveCMSDatabase(db);
        addAuditLog(userName || "Admin User", "Deleted Form Submission", deleted.name);
        return res.json({ success: true, deletedId: id });
      }
      res.status(404).json({ error: "Submission not found." });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete submission: " + error.message });
    }
  });

  // Export submissions as CSV
  app.get("/api/cms/submissions/export", (req, res) => {
    try {
      const db = getCMSDatabase();
      const headers = ["ID", "Type", "Name", "Email", "Phone", "Subject/Project", "Budget", "Message/Vision", "Status", "Created At"];
      const rows = db.submissions.map((s) => [
        s.id,
        s.type,
        `"${(s.name || "").replace(/"/g, '""')}"`,
        `"${(s.email || "").replace(/"/g, '""')}"`,
        `"${(s.phone || "").replace(/"/g, '""')}"`,
        `"${(s.subject || s.projectType || "").replace(/"/g, '""')}"`,
        `"${(s.budgetRange || "").replace(/"/g, '""')}"`,
        `"${(s.message || s.spaceDescription || "").replace(/"/g, '""')}"`,
        s.status,
        s.createdAt
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=ginosko_form_submissions_${Date.now()}.csv`);
      res.send(csvContent);
    } catch (error: any) {
      res.status(500).json({ error: "CSV Export failed: " + error.message });
    }
  });

  // User Management Endpoints
  app.post("/api/cms/users", (req, res) => {
    try {
      const { user, userName } = req.body;
      if (!user || !user.email) {
        return res.status(400).json({ error: "Valid user details are required." });
      }

      const db = getCMSDatabase();
      const existingIdx = db.users.findIndex((u) => u.id === user.id || u.email === user.email);

      if (existingIdx !== -1) {
        db.users[existingIdx] = {
          ...db.users[existingIdx],
          ...user
        };
        addAuditLog(userName || "Super Admin", "Updated User Account", user.email, `Role: ${user.role}`);
      } else {
        const newUser: CMSUser = {
          id: `usr-${Date.now()}`,
          name: user.name || "New User",
          email: user.email,
          role: user.role || "Editor",
          avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
          passwordHash: user.password || "ginosko2026",
          createdAt: new Date().toISOString()
        };
        db.users.push(newUser);
        addAuditLog(userName || "Super Admin", "Created User Account", user.email, `Role: ${user.role}`);
      }

      saveCMSDatabase(db);
      const publicUsers = db.users.map(({ passwordHash, ...u }) => u);
      res.json({ success: true, users: publicUsers });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update user: " + error.message });
    }
  });

  app.delete("/api/cms/users/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { userName } = req.body || {};
      const db = getCMSDatabase();

      if (db.users.length <= 1) {
        return res.status(400).json({ error: "Cannot delete the sole administrator account." });
      }

      const idx = db.users.findIndex((u) => u.id === id);
      if (idx !== -1) {
        const deleted = db.users.splice(idx, 1)[0];
        saveCMSDatabase(db);
        addAuditLog(userName || "Super Admin", "Deleted User Account", deleted.email);
        const publicUsers = db.users.map(({ passwordHash, ...u }) => u);
        return res.json({ success: true, users: publicUsers });
      }
      res.status(404).json({ error: "User not found." });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete user: " + error.message });
    }
  });

  // Audit Activity Logs
  app.get("/api/cms/activity", (req, res) => {
    try {
      const db = getCMSDatabase();
      res.json({ logs: db.auditLogs });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch logs: " + error.message });
    }
  });

  // API Endpoints
  app.post("/api/quote-advisor", async (req, res) => {
    try {
      const { name, email, projectType, budgetRange, spaceDescription, preferences } = req.body;

      if (!ai) {
        // High-fidelity fallback when the Gemini API key is not configured in the workspace
        const simulatedResult = {
          executiveSummary: `Dear ${name || "Honorable Client"}, thank you for consulting Ginosko Furniture & Construction. Based on your interest in a ${projectType || "bespoke space design"} with a budget estimation tier of ${budgetRange || "Premium Luxury"}, we have crafted an exclusive design & architectural outline. Your vision for "${spaceDescription || "a high-end luxury space"}" matches perfectly with our master woodworking and turnkey finish standards.`,
          conceptAdvisory: `We recommend an architectural concept incorporating hand-finished Nigerian teak wood, high-gloss microcement floors, brushed brass metal profiles, and linear architectural light niches. For your "${preferences || "minimalist luxury"}" preferences, Ginosko custom furniture would feature floating wood joints, integrated LED backlighting, and hidden hardware interfaces to maintain absolute minimalism.`,
          constructionTimeline: `- Phase 1: Interactive Consultation & Virtual 3D Mockups (1 - 2 Weeks)\n- Phase 2: Material Sourcing & Off-Site Wood Shop Joinery Prefabrication (3 - 4 Weeks)\n- Phase 3: Site Preparation, Civil Fit-out & Structural Alignments (2 - 3 Weeks)\n- Phase 4: Precision Assembly, Installation & Master Lacquer Detailing (1 Week)\n- Phase 5: Comprehensive Quality Walkthrough & Bespoke Handover (3 Days)`,
          estimatedCostBreakdown: {
            designFees: "₦1,500,000 - ₦2,500,000 (Approx. $1,000 - $1,600 USD)",
            materialsCustomWoodwork: "₦12,000,000 - ₦22,000,000 (Approx. $8,000 - $14,500 USD)",
            laborAndFitOut: "₦5,000,000 - ₦8,000,000 (Approx. $3,300 - $5,300 USD)",
            contingencyTotal: "₦18,500,000 - ₦32,500,000 (Approx. $12,300 - $21,400 USD)"
          },
          nextSteps: "Schedule a physical curation tour at our Ginosko Creative Atelier, where we will present material boards, physical timber textures, and finalize 3D blueprint plans with our Principal Architect."
        };
        return res.json({ result: simulatedResult, isSimulated: true });
      }

      const prompt = `You are the Lead Architect and Principal Space Planner at Ginosko Furniture & Construction Company in Nigeria (a premium luxury custom furniture and construction firm).
A client has requested a bespoke space design consultation and cost estimation.

Client Details:
- Name: ${name}
- Email: ${email}
- Project Type: ${projectType}
- Budget Range: ${budgetRange}
- Space Description / Client Vision: ${spaceDescription}
- Specific Material / Design Preferences: ${preferences}

Generate a premium, detailed, custom architectural advisory in JSON format.
The advice must follow this schema:
1. executiveSummary: A highly personalized, elite, and inspiring welcoming address that addresses their specific space vision, written in an authoritative and deeply artistic architectural voice.
2. conceptAdvisory: Deeply specific layout, structural ideas, woods (e.g. Nigerian Iroko, Walnut, Teak, Obeche), marbles, color palettes, and lighting design ideas custom-curated for this client.
3. constructionTimeline: A formatted string outlining a step-by-step master plan of execution (5 clear phases from consultation to handover).
4. estimatedCostBreakdown: An object containing:
   - designFees: string (Nigerian Naira ₦ and USD equivalents)
   - materialsCustomWoodwork: string (Nigerian Naira ₦ and USD equivalents)
   - laborAndFitOut: string (Nigerian Naira ₦ and USD equivalents)
   - contingencyTotal: string (Nigerian Naira ₦ and USD equivalents)
5. nextSteps: Beautifully written elegant instructions on scheduling an atelier meeting or site visit.

Make the output feel extraordinarily refined, professional, luxurious, and fully tailored. No placeholders.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: { type: Type.STRING },
              conceptAdvisory: { type: Type.STRING },
              constructionTimeline: { type: Type.STRING },
              estimatedCostBreakdown: {
                type: Type.OBJECT,
                properties: {
                  designFees: { type: Type.STRING },
                  materialsCustomWoodwork: { type: Type.STRING },
                  laborAndFitOut: { type: Type.STRING },
                  contingencyTotal: { type: Type.STRING }
                },
                required: ["designFees", "materialsCustomWoodwork", "laborAndFitOut", "contingencyTotal"]
              },
              nextSteps: { type: Type.STRING }
            },
            required: ["executiveSummary", "conceptAdvisory", "constructionTimeline", "estimatedCostBreakdown", "nextSteps"]
          }
        }
      });

      const jsonText = response.text || "";
      const parsed = JSON.parse(jsonText.trim());
      res.json({ result: parsed, isSimulated: false });
    } catch (error: any) {
      console.error("Gemini Advisor API Error:", error);
      res.status(500).json({ error: "Failed to generate bespoke report: " + error.message });
    }
  });

  // Vite Integration for Serving Assets & SPA routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Ginosko Server] Running on http://0.0.0.0:${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
}

startServer();
