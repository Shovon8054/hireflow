import { generateChatReply } from "../../services/aiChat.service.js";

/**
 * Controller to handle AI career chatbot interactions.
 * Connects frontend Chatbot to Gemini using process.env.GEMINI_API_KEY.
 */
export const handleChat = async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid message string.",
    });
  }

  try {
    const reply = await generateChatReply(message.trim(), history || []);

    return res.status(200).json({
      success: true,
      reply,
      output: reply,
      response: reply,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      reply: "I'm having a brief connection issue reaching the AI brain. Please try your question again in a moment.",
      message: error.message || "Failed to process chat message.",
    });
  }
};
