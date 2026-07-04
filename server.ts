import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

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
