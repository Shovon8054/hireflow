import fs from "fs/promises";
import { extractCvText } from "../../services/cvExtractor.service.js";
import { analyzeCvWithAi } from "../../services/aiAnalyzer.service.js";

/**
 * Controller to handle temporary CV upload, text extraction, and AI analysis.
 * Ensures the uploaded file is strictly deleted immediately after processing.
 * Does NOT persist CV or analysis in MySQL.
 */
export const analyzeCV = async (req, res) => {
  const filePath = req.file?.path;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a valid CV file (PDF or DOCX).",
    });
  }

  try {
    // 1. Extract text from uploaded temporary document
    const extractedText = await extractCvText(filePath, req.file.originalname);

    // 2. Perform AI-powered CV review
    const analysis = await analyzeCvWithAi(extractedText);

    // 3. Return analysis result to client without persisting in database
    return res.status(200).json({
      success: true,
      message: "CV analyzed successfully.",
      data: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        analyzedAt: new Date().toISOString(),
        analysis,
      },
    });
  } catch (error) {
    console.error("CV Analysis Controller Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to analyze CV. Please try again.",
    });
  } finally {
    // 4. Guaranteed temporary file cleanup: delete file from disk regardless of success or error
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (cleanupErr) {
        // File may have already been removed or not found
        console.warn(`Could not delete temporary CV file at ${filePath}:`, cleanupErr.message);
      }
    }
  }
};
