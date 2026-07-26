import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Ask Gita AI / Science of Krishna Companion
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, promptHistory } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Helpful fallback response when GEMINI_API_KEY is pending configuration
        return res.json({
          reply: `[Science of Krishna AI]: Based on Vedic Science and Bhagavad Gita insights regarding "${message}":\n\nThe Bhagavad Gita teaches that consciousness (Purusha) is fundamental and non-local. In Chapter 2 Verse 20, the eternal nature of energy and soul aligns directly with the First Law of Thermodynamics and Quantum Information Theory. Mind control (Chapter 6) requires steady intellect (Buddhi) to calm the default mode network.\n\n(Note: Set GEMINI_API_KEY in secrets for custom live Gemini answers!)`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the Science of Krishna AI Companion — an eloquent scholar bridging Vedic scriptural wisdom (Bhagavad Gita, Upanishads, Srimad Bhagavatam) with modern science (quantum physics, neuroscience, nutritional epigenetics, epistemology, and ethical AI). 
Your responses are serene, scientifically grounded, respectful, and insightful. Highlight Sanskrit verse references (e.g. BG 2.20, BG 10.8) and their scientific parallels whenever relevant. Keep responses concise, clear, and inspiring.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ]
      });

      const replyText = response.text || "No response generated.";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI response" });
    }
  });

  // Vite middleware in development
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
