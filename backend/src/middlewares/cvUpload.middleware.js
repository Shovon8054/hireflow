import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure temporary upload directory exists
const tempUploadDir = path.resolve("uploads/temp");
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Temporary disk storage for processing
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `cv-${uniqueSuffix}${ext}`);
  },
});

// File filter for PDF and DOCX only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream", // Some browsers/clients send docx as octet-stream
  ];

  if (allowedExtensions.includes(ext) && (allowedMimeTypes.includes(file.mimetype) || ext === ".docx" || ext === ".pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF (.pdf) and Word (.docx) documents are supported."));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter,
}).single("cv");

// Express middleware wrapper to catch and format multer errors
export const cvUploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size exceeds the 5MB limit. Please upload a smaller file.",
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Invalid file upload.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CV file uploaded. Please upload a PDF or DOCX file under 'cv'.",
      });
    }

    next();
  });
};
