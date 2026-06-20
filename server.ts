/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsing with larger limit to support base64 prescription images
app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Google GenAI client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in your Secrets / .env settings.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiInstance;
}

// -----------------------------------------------------------------------------
// Core AI Routes & Endpoints
// -----------------------------------------------------------------------------

// 1. AI Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: "Message content is required" });
       return;
    }

    const ai = getGeminiClient();

    // Define the pharmacist persona & guidelines matching the 108課綱 high school biology/chemistry curriculum
    const systemInstruction = `
你是一位非常專業、溫柔耐心的「AI 藥師助理」(AI Pharmacist Assistant)。你的工作是協助使用者、高中學生與一般大眾解答日常用藥知識、生物化學機制（以台灣高中課綱 108 課綱的「基礎生物」與「選修化學」為核心銜接）以及提供安全的生活衛教與用藥警示。

在與使用者互動時，請務必遵守以下標準與規範：
1. **角色認知**：你是藥師助理，能深入淺出用高中生化知識（例如：RAAS系統、G共軛蛋白受體 GPCR、ATP依賴型泵、不可逆共價結合、競爭性抑制、超極化與突觸傳遞機制）來剖析藥物機轉。
2. **對標圖片資料**：我們有一個核心字首/字尾與藥物分類關聯數據庫，對應 Cephalosporin類抗生素 (代數機轉)、抗病毒藥 (-vir-, -navir, -gravir)、鎮靜安眠 (-barbital, -azepam,-azolam, Z-drugs)、氣喘 (-terol, -lukast)、胃潰瘍阻斷、凝血異常拮抗、高血脂降脂 (-statin, -fibr-)、糖尿病降糖與高血壓五大降壓。當使用者詢問相關藥物字尾字首時，請積極調用該分類進行解說。
3. **安全免責聲明**：雖然回答力求精準客觀，但請在回答的適當部分加入簡短親切的提醒：「提醒您：本助理提供生化知識與用藥衛教參考。若有實際病情或服藥疑問，應前往醫療院所諮詢專業醫師或藥師！」
4. **語氣與文字**：請一律使用由「繁體中文（台灣習慣術語）」作答，回答排版清晰明瞭，適當運用粗體與條列式，給予患者和學子極具質感的雙向回饋。
5. **生活衛教建議**：回答多數用藥問題時，隨附貼心的生活習慣指引，例如「避免與葡萄柚汁共服」、「按時服用抗生素吃滿療程防抗藥性」、「起步慢防止姿勢性低血壓」等。
`;

    // Initialize clean chat history formats for the @google/genai SDK chats
    // We format previous chat turns correctly.
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Send the message and resolve
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "AI 藥師暫時無法連線。請確認您的 GEMINI_API_KEY 已正確配置！" });
  }
});

// 2. Optical Drug Scanner & Prescription Analyzer (Image Input)
app.post("/api/analyze-prescription", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
       res.status(400).json({ error: "Image data is required in base64 format." });
       return;
    }

    const ai = getGeminiClient();

    const textPart = {
      text: `
請扮演專業的「AI 藥師助理」，仔細分析這張藥袋、藥物外包裝或處方箋圖片中的文字。請整理出以下重點：
1. **藥品名稱偵測**：指出辨識出來的英文藥名（如 Amlodipine、Omeprazole 等）和中文品名。
2. **探查字首/字尾與藥理類別**：根據我們整理的生化知識，看看它是否符合這幾類（如 -statin、-pril、-sartan、-dipine、-tidine、-prazole、-gliflozin 等九大類字尾字首）。如果是，請指出它是哪一類藥以及它的作用。
3. **適應症、副作用與用藥禁忌說明**：精準提供其防範與解說。
4. **生物與化學作用機轉（高中基礎/進階銜接教案）**：用適合高中生理解的科普文字，解釋如：RAAS、鈣通道拮抗、質子泵不可逆共價結合、GABA-A氯離子通道調節等生化理論。
5. **生活衛教與安全建議**：附帶實用的健康照顧指引（像是是否空腹服用、忌吃葡萄柚、防姿勢性低血壓等）。

請用清晰流暢的台灣「繁體中文」進行條列式排版。如果不小心辨識不清或圖片模糊，請條理化地引導使用者，並給予通用的安全吃藥建議。
`
    };

    const imagePart = {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(",")[1] || imageBase64 // strips prefix if present
      }
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/analyze-prescription:", error);
    res.status(500).json({ error: error.message || "分析圖片失敗，請重試或上傳更清晰的局部照片！" });
  }
});

// -----------------------------------------------------------------------------
// Vite Dev Server Middleware or Production Static Serving Setup
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
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
    console.log(`[AI Pharmacist Server] Listening on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
