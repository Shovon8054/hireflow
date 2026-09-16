import { GoogleGenAI } from "@google/genai";

/**
 * Service to generate conversational responses for the HireFlow AI Career Assistant.
 * Uses the configured GEMINI_API_KEY with multi-model fallback.
 *
 * @param {string} userMessage - The user's query
 * @param {Array} history - Optional previous conversation turns [{ sender: 'user'|'bot', text: string }]
 * @returns {Promise<string>} - AI response text
 */
export const generateChatReply = async (userMessage, history = []) => {
  const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;

  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Please set GEMINI_API_KEY in your backend .env file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
You are the HireFlow AI Assistant, an expert career mentor, recruitment coach, and resume consultant for the HireFlow job platform.
Your goal is to help candidates, students, and job seekers with:
1. Tech & non-tech resume optimization and ATS tips
2. Technical and behavioral interview preparation (STAR method)
3. In-demand skills, learning roadmaps, and career development
4. Job search strategies and standing out to hiring managers

Tone & Style:
- Warm, encouraging, professional, and clear.
- Use concise markdown formatting (bullet points, bold highlights, headers) where helpful.
- Keep advice practical, concrete, and directly relevant to job seekers.
`;

  // Format conversational context if history is provided
  let conversationPrompt = "";
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-6); // Last 6 messages for context
    conversationPrompt = recentHistory
      .map((item) => `${item.sender === "user" ? "Candidate" : "HireFlow AI"}: ${item.text}`)
      .join("\n");
    conversationPrompt += `\nCandidate: ${userMessage}\nHireFlow AI:`;
  } else {
    conversationPrompt = `Candidate: ${userMessage}\nHireFlow AI:`;
  }

  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro"
  ];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\n${conversationPrompt}` }] }
        ],
      });

      const replyText = response?.text?.trim();
      if (replyText) {
        return replyText;
      }
    } catch (err) {
      lastError = err;
      const isRetryable =
        err.message?.includes("503") ||
        err.message?.includes("429") ||
        err.message?.includes("404") ||
        err.message?.includes("NOT_FOUND") ||
        err.message?.includes("not found") ||
        err.message?.includes("UNAVAILABLE") ||
        err.message?.includes("high demand") ||
        err.message?.includes("quota");

      if (!isRetryable) {
        throw err;
      }
    }
  }

  throw new Error(
    `AI chat response unavailable: ${lastError?.message || "Please try again in a few moments."}`
  );
};
