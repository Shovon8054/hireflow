import fs from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

/**
 * Sanitizes and cleans extracted document text for AI processing:
 * - Normalizes Unicode and line breaks
 * - Removes unprintable control characters (except standard whitespace)
 * - Collapses excessive whitespace while preserving paragraph flow
 *
 * @param {string} rawText - Raw text extracted from file
 * @returns {string} - Clean, normalized plain text
 */
export const cleanExtractedText = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    return "";
  }

  return rawText
    // Remove non-printable control characters except newline, carriage return, and tab
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
    // Normalize Windows/Mac line endings to standard Unix \n
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    // Replace multiple consecutive tabs/spaces with a single space
    .replace(/[ \t]+/g, " ")
    // Replace more than two consecutive newlines with two newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/**
 * Extracts plain text from a PDF file.
 *
 * @param {string} filePath - Absolute path to the PDF file
 * @returns {Promise<string>} - Extracted raw text
 */
export const extractTextFromPdf = async (filePath) => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("Empty file.");
    }

    const parser = new PDFParse({ data: fileBuffer });
    const parseResult = await parser.getText();
    return parseResult?.text || "";
  } catch (err) {
    if (err.name === "PasswordException" || err.message?.toLowerCase().includes("password")) {
      throw new Error("The uploaded PDF is password-protected. Please upload an unprotected file.");
    }
    throw new Error("Could not parse the PDF file. It may be corrupted or in an unsupported format.");
  }
};

/**
 * Extracts plain text from a DOCX file.
 *
 * @param {string} filePath - Absolute path to the DOCX file
 * @returns {Promise<string>} - Extracted raw text
 */
export const extractTextFromDocx = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);
    if (stats.size === 0) {
      throw new Error("Empty file.");
    }

    const result = await mammoth.extractRawText({ path: filePath });
    return result?.value || "";
  } catch (err) {
    throw new Error("Could not parse the Word (.docx) document. It may be corrupted or invalid.");
  }
};

/**
 * Main CV text extraction service.
 * Supports PDF and DOCX formats.
 * Validates document readability and rejects image-only/scanned files.
 *
 * @param {string} filePath - Path to temporary file on disk
 * @param {string} originalName - Original filename with extension
 * @returns {Promise<string>} - Clean, ready-to-analyze plain text
 */
export const extractCvText = async (filePath, originalName) => {
  const ext = path.extname(originalName || "").toLowerCase();
  let rawText = "";

  if (ext === ".pdf") {
    rawText = await extractTextFromPdf(filePath);
  } else if (ext === ".docx") {
    rawText = await extractTextFromDocx(filePath);
  } else {
    throw new Error(`Unsupported file type '${ext}'. Please upload a PDF (.pdf) or Word (.docx) file.`);
  }

  const cleanedText = cleanExtractedText(rawText);

  // Minimum content threshold check:
  // Catches empty CVs, scanned/image-only PDFs lacking an OCR text layer, or unreadable files.
  if (!cleanedText || cleanedText.length < 30) {
    throw new Error(
      "Could not extract text from this CV. Please upload a text-based PDF or DOCX file."
    );
  }

  return cleanedText;
};
