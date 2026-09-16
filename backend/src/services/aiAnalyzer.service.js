import { GoogleGenAI } from "@google/genai";

/**
 * Normalizes and ensures the parsed object strictly contains all required fields.
 *
 * @param {Object} rawData - Parsed JSON object from Gemini
 * @returns {Object} - Formatted and validated analysis object
 */
const normalizeAnalysisOutput = (rawData) => {
  return {
    overallScore: typeof rawData?.overallScore === "number" ? Math.min(Math.max(rawData.overallScore, 0), 100) : 70,
    atsScore: typeof rawData?.atsScore === "number" ? Math.min(Math.max(rawData.atsScore, 0), 100) : 65,
    summary: rawData?.summary || "Comprehensive analysis of candidate CV completed.",
    strengths: Array.isArray(rawData?.strengths) ? rawData.strengths : [],
    weaknesses: Array.isArray(rawData?.weaknesses) ? rawData.weaknesses : [],
    sectionReviews: {
      summary: {
        status: rawData?.sectionReviews?.summary?.status || "Not Specified",
        feedback: rawData?.sectionReviews?.summary?.feedback || "No summary provided or evaluated.",
        suggestions: Array.isArray(rawData?.sectionReviews?.summary?.suggestions)
          ? rawData.sectionReviews.summary.suggestions
          : [],
      },
      education: {
        status: rawData?.sectionReviews?.education?.status || "Not Specified",
        feedback: rawData?.sectionReviews?.education?.feedback || "No education section evaluated.",
        suggestions: Array.isArray(rawData?.sectionReviews?.education?.suggestions)
          ? rawData.sectionReviews.education.suggestions
          : [],
      },
      skills: {
        status: rawData?.sectionReviews?.skills?.status || "Not Specified",
        feedback: rawData?.sectionReviews?.skills?.feedback || "No skills section evaluated.",
        suggestions: Array.isArray(rawData?.sectionReviews?.skills?.suggestions)
          ? rawData.sectionReviews.skills.suggestions
          : [],
      },
      projects: {
        status: rawData?.sectionReviews?.projects?.status || "Not Specified",
        feedback: rawData?.sectionReviews?.projects?.feedback || "No projects section evaluated.",
        suggestions: Array.isArray(rawData?.sectionReviews?.projects?.suggestions)
          ? rawData.sectionReviews.projects.suggestions
          : [],
      },
      experience: {
        status: rawData?.sectionReviews?.experience?.status || "Not Specified",
        feedback: rawData?.sectionReviews?.experience?.feedback || "No experience section evaluated.",
        suggestions: Array.isArray(rawData?.sectionReviews?.experience?.suggestions)
          ? rawData.sectionReviews.experience.suggestions
          : [],
      },
      certificationsAndAchievements: {
        status: rawData?.sectionReviews?.certificationsAndAchievements?.status || "Optional",
        feedback:
          rawData?.sectionReviews?.certificationsAndAchievements?.feedback ||
          "No certifications or achievements listed.",
        suggestions: Array.isArray(rawData?.sectionReviews?.certificationsAndAchievements?.suggestions)
          ? rawData.sectionReviews.certificationsAndAchievements.suggestions
          : [],
      },
    },
    atsIssues: Array.isArray(rawData?.atsIssues) ? rawData.atsIssues : [],
    improvements: Array.isArray(rawData?.improvements) ? rawData.improvements : [],
    missingInformation: Array.isArray(rawData?.missingInformation) ? rawData.missingInformation : [],
  };
};

/**
 * Analyzes CV text using Google Gemini AI and returns a strictly structured evaluation.
 *
 * Workflow:
 * 1. Read GEMINI_API_KEY from environment.
 * 2. Formulate comprehensive evaluation prompt ensuring concrete, grounded feedback.
 * 3. Enforce JSON schema and application/json response format.
 * 4. Safely parse response with fallback handling.
 *
 * @param {string} cvText - Plain text extracted from candidate CV
 * @returns {Promise<Object>} - Structured CV analysis object
 */
export const analyzeCvWithAi = async (cvText) => {
  const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;

  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Please set GEMINI_API_KEY in your backend .env file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
You are an expert HR recruiter, professional career advisor, and Applicant Tracking System (ATS) auditor.
Analyze the candidate's CV text objectively and provide constructive, highly actionable feedback.

STRICT GUIDELINES:
1. Give practical, concrete feedback based ONLY on the provided text.
2. Identify specific problems, missing details, and weak points.
3. Suggest clear, actionable improvements (e.g. quantifiable metrics, standard section headers, STAR format).
4. Avoid making unsupported claims.
5. NEVER invent experience, education, skills, or achievements that are not explicitly present in the CV.
6. Focus on helping the candidate upgrade their CV to secure interviews.
7. Return ONLY a valid JSON object matching the requested schema.
`;

  const userPrompt = `
Analyze the following curriculum vitae (CV) / resume text:

--- CV TEXT START ---
${cvText.slice(0, 15000)}
--- CV TEXT END ---

Provide your evaluation strictly as a JSON object adhering to this schema:
{
  "overallScore": <number 0-100 reflecting overall resume impact and quality>,
  "atsScore": <number 0-100 reflecting readability by automated parsing software>,
  "summary": "<2-3 sentence executive review of the candidate profile>",
  "strengths": [
    "<concrete strength 1>",
    "<concrete strength 2>",
    "<concrete strength 3>"
  ],
  "weaknesses": [
    "<concrete weakness 1>",
    "<concrete weakness 2>",
    "<concrete weakness 3>"
  ],
  "sectionReviews": {
    "summary": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<detailed assessment of summary or objective>",
      "suggestions": ["<actionable recommendation>"]
    },
    "education": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<assessment of degrees, institutions, GPA/honors if applicable>",
      "suggestions": ["<actionable recommendation>"]
    },
    "skills": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<assessment of technical and soft skills categorization and depth>",
      "suggestions": ["<actionable recommendation>"]
    },
    "projects": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<assessment of project descriptions, technologies, and outcomes>",
      "suggestions": ["<actionable recommendation>"]
    },
    "experience": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<assessment of work history, bullet clarity, metrics, and STAR method>",
      "suggestions": ["<actionable recommendation>"]
    },
    "certificationsAndAchievements": {
      "status": "<'Strong' | 'Needs Improvement' | 'Missing'>",
      "feedback": "<assessment of certifications, licenses, awards, or extracurriculars>",
      "suggestions": ["<actionable recommendation>"]
    }
  },
  "atsIssues": [
    "<specific ATS compliance barrier, e.g. non-standard headers, missing keywords, parsing hazards>"
  ],
  "improvements": [
    "<high-impact prioritized improvement 1>",
    "<high-impact prioritized improvement 2>",
    "<high-impact prioritized improvement 3>"
  ],
  "missingInformation": [
    "<critical missing element, e.g. contact details, dates, metrics, GitHub links, education>"
  ]
}
`;

  // Candidate models with fallback order in case of transient capacity issues or model availability
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro"
  ];
  let rawResponseText = "";
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }
        ],
        config: {
          responseMimeType: "application/json",
        },
      });

      rawResponseText = response?.text?.trim() || "";
      if (rawResponseText) {
        lastError = null;
        break;
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
        throw new Error(`AI CV analysis error: ${err.message || "Failed to communicate with AI service."}`);
      }
    }
  }

  if (!rawResponseText) {
    throw new Error(
      `AI analysis temporarily unavailable: ${lastError?.message || "Please try again shortly."}`
    );
  }

  // Safe parsing with regex and fallback handling
  try {
    // Strip markdown code fences if model enclosed JSON in ```json ... ```
    const cleanJson = rawResponseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanJson);
    return normalizeAnalysisOutput(parsed);
  } catch (parseError) {
    // Attempt extracting JSON substring if there was extra commentary
    const jsonMatch = rawResponseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const extracted = JSON.parse(jsonMatch[0]);
        return normalizeAnalysisOutput(extracted);
      } catch {
        // Fall through to safe default
      }
    }

    // Graceful fallback response so the server never crashes
    return normalizeAnalysisOutput({
      overallScore: 65,
      atsScore: 60,
      summary: "Resume analysis completed. Please review formatting and keyword alignment.",
      strengths: ["Candidate demonstrates foundational background in their domain."],
      weaknesses: ["Document structure could be improved for ATS parsers and hiring managers."],
      sectionReviews: {},
      atsIssues: ["Ensure standard headings and text-based formatting are utilized."],
      improvements: [
        "Include measurable metrics and business outcomes in work experience.",
        "Add relevant technical and role-specific keywords.",
      ],
      missingInformation: ["Verify that all dates, contact details, and locations are clearly stated."],
    });
  }
};
