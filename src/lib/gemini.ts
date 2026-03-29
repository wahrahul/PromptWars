import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const isKeyMissing = !API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY.trim() === '';

const genAI = new GoogleGenerativeAI(API_KEY || "placeholder");

const MISSING_KEY_MESSAGE = `⚡ Gemini AI Engine Offline — To activate, paste your free API key into the .env file:\n\n1. Visit: https://aistudio.google.com/app/apikey\n2. Click "Create API Key"\n3. Open PromptWar/.env and set:\n   VITE_GEMINI_API_KEY=your_key_here\n4. Restart the dev server (npm start)`;

export const getAiInsight = async (nodeName: string, nodeType: string, nodeDesc: string) => {
  if (isKeyMissing) {
    return MISSING_KEY_MESSAGE;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are the "Gemini AI Core" of a Universal Social Bridge system.
      A user has selected a node in the Knowledge Graph:
      - Name: ${nodeName}
      - Type: ${nodeType}
      - Description: ${nodeDesc}

      Provide a concise, professional, and slightly futuristic insight (2-3 sentences) about why this node is critical for the "Universal Social Bridge" ecosystem. 
      Do not use markdown formatting like bold or headers. Just plain text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "AI Engine encountered an error. Please check your API key and try again.";
  }
};

export const getSystemSummary = async (graphData: any) => {
  if (isKeyMissing) {
    return "AI System Verdicts are offline. Configure your Gemini API key to enable real-time network intelligence.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const nodes = graphData.nodes.map((n: any) => n.name).join(", ");
    const prompt = `
      Analyze this list of system nodes in a "Universal Social Bridge": ${nodes}.
      Provide a one-sentence "Intelligent System Verdict" on the current network health and potential for social-governmental integration.
      Keep it professional and futuristic.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Error generating system summary.";
  }
};

export const getSynergyAnalysis = async (nodeA: any, nodeB: any) => {
  if (isKeyMissing) {
    return MISSING_KEY_MESSAGE;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are the "Gemini AI Core". Analyze the potential synergy between these two nodes:
      Node A: ${nodeA.name} (${nodeA.group}) - ${nodeA.desc}
      Node B: ${nodeB.name} (${nodeB.group}) - ${nodeB.desc}

      How can these two systems be bridged to create a "Universal Social Bridge"? 
      Provide a highly intelligent, short (2-3 sentences) synergy report.
      Use plain text only.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Synergy Error:", error);
    return "AI Engine encountered an error. Please check your API key and try again.";
  }
};
