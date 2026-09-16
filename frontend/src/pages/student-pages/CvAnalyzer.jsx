import { useState, useRef } from "react";
import { 
  FileCheck, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  TrendingUp, 
  Layers, 
  Award, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Lightbulb
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

const CvAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  // Validate selected file locally before submission
  const validateFile = (selectedFile) => {
    if (!selectedFile) return "Please select a file.";
    
    const fileName = selectedFile.name.toLowerCase();
    const isAllowed = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    if (!isAllowed) {
      return "Unsupported file type. Please upload a PDF (.pdf) or Word (.docx) document.";
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      return `File size is ${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB. Maximum allowed size is 5MB.`;
    }

    return null;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validationError = validateFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setError(null);
    setFile(selected);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const validationError = validateFile(droppedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setError(null);
    setFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStartAnalysis = async () => {
    if (!file) {
      setError("Please select a CV file to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAnalysisStep(1);

    // Multi-phase progress simulation for premium UX
    const stepTimer1 = setTimeout(() => setAnalysisStep(2), 1200);
    const stepTimer2 = setTimeout(() => setAnalysisStep(3), 3200);

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await api.post("/cv/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success && response.data?.data?.analysis) {
        setResult(response.data.data);
      } else {
        throw new Error(response.data?.message || "Analysis failed to complete. Please try again.");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message || "Failed to analyze CV. Please try again.";
      setError(serverMsg);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getScoreRating = (score) => {
    if (score >= 85) return "Exceptional";
    if (score >= 70) return "Competitive";
    if (score >= 50) return "Average";
    return "Needs Immediate Improvement";
  };

  const getSectionStatusBadge = (status) => {
    const cleanStatus = (status || "").toLowerCase();
    if (cleanStatus.includes("strong") || cleanStatus.includes("good")) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <Check className="w-3 h-3" /> Strong
        </span>
      );
    }
    if (cleanStatus.includes("need") || cleanStatus.includes("improve")) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
          <AlertTriangle className="w-3 h-3" /> Needs Improvement
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
        <AlertCircle className="w-3 h-3" /> Missing / Incomplete
      </span>
    );
  };

  const sectionIconMap = {
    summary: FileText,
    education: GraduationCap,
    skills: Code,
    projects: Layers,
    experience: Briefcase,
    certificationsAndAchievements: Award,
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI-Powered Career Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
            AI CV & Resume Analyzer
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Upload your CV in PDF or DOCX format for an instant, in-depth evaluation powered by Gemini AI.
            Receive comprehensive section audits, ATS scoring, and targeted suggestions to land more interviews.
          </p>
        </div>

        {/* Upload Card (Show when no results yet) */}
        {!result && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 transition-all">
            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50/60 scale-[1.01]"
                  : file
                  ? "border-emerald-300 bg-emerald-50/20"
                  : "border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
                disabled={isAnalyzing}
              />

              <div className="flex flex-col items-center justify-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 ${
                  file
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-blue-100 text-blue-600 group-hover:scale-105"
                }`}>
                  {file ? (
                    <FileCheck className="w-8 h-8" />
                  ) : (
                    <UploadCloud className="w-8 h-8" />
                  )}
                </div>

                {file ? (
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900 break-all">{file.name}</p>
                    <p className="text-sm text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-base font-semibold text-slate-800">
                      Drag and drop your CV here, or <span className="text-blue-600 underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      Supports PDF and DOCX files up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected File Details Bar */}
            {file && !isAnalyzing && (
              <div className="mt-4 flex items-center justify-between px-4 py-2.5 bg-slate-100/80 rounded-xl text-sm border border-slate-200">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="font-medium text-slate-700 truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Upload Notice</p>
                  <p className="mt-0.5 text-rose-700 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State Animation */}
            {isAnalyzing && (
              <div className="mt-6 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  <span className="text-base font-bold text-slate-900">
                    {analysisStep === 1 && "Uploading and validating CV document..."}
                    {analysisStep === 2 && "Extracting and parsing text contents..."}
                    {analysisStep === 3 && "Running Gemini AI analysis & ATS audit..."}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: analysisStep === 1 ? "30%" : analysisStep === 2 ? "65%" : "90%",
                    }}
                  />
                </div>

                <p className="text-xs text-slate-500">
                  Your CV is analyzed securely in-memory and will not be stored permanently.
                </p>
              </div>
            )}

            {/* Action Button */}
            {!isAnalyzing && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  disabled={!file}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all duration-200 ${
                    file
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 hover:shadow-lg hover:scale-[1.005] active:scale-[0.99]"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start AI CV Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Privacy Assurance */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strictly confidential: Temporary processing only. No data stored in database.</span>
            </div>
          </div>
        )}

        {/* Results Presentation (Shown when analysis is complete) */}
        {result && result.analysis && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Top Bar with File & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{result.fileName}</h2>
                  <p className="text-xs text-slate-500">
                    Analyzed on {new Date(result.analyzedAt || Date.now()).toLocaleDateString()} at{" "}
                    {new Date(result.analyzedAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another CV</span>
              </button>
            </div>

            {/* Score Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Overall Quality Score */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Overall CV Quality
                  </span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                      {result.analysis.overallScore}
                    </span>
                    <span className="text-slate-400 font-medium">/ 100</span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(result.analysis.overallScore)}`}>
                      {getScoreRating(result.analysis.overallScore)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-6 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${result.analysis.overallScore}%` }}
                  />
                </div>
              </div>

              {/* ATS Compatibility Score */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    ATS Readability
                  </span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                      {result.analysis.atsScore}
                    </span>
                    <span className="text-slate-400 font-medium">/ 100</span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(result.analysis.atsScore)}`}>
                      {result.analysis.atsScore >= 75 ? "ATS Optimized" : "Needs Formatting Polish"}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-6 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${result.analysis.atsScore}%` }}
                  />
                </div>
              </div>

              {/* Executive Summary Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Executive Impression</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed font-normal text-blue-50/95">
                    {result.analysis.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2 text-xs text-blue-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Objective, grounded assessment</span>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">Top Strengths</h3>
                </div>
                {result.analysis.strengths && result.analysis.strengths.length > 0 ? (
                  <ul className="space-y-3">
                    {result.analysis.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 italic">No specific strengths documented.</p>
                )}
              </div>

              {/* Weaknesses */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 text-amber-700">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-slate-900">Areas to Address</h3>
                </div>
                {result.analysis.weaknesses && result.analysis.weaknesses.length > 0 ? (
                  <ul className="space-y-3">
                    {result.analysis.weaknesses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          !
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 italic">No significant critical weaknesses identified.</p>
                )}
              </div>
            </div>

            {/* Section-by-Section Deep Dive */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Section-by-Section Review</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Detailed evaluation of individual resume segments and specific recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {Object.entries(result.analysis.sectionReviews || {}).map(([key, review]) => {
                  const Icon = sectionIconMap[key] || FileText;
                  const formattedTitle = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());

                  return (
                    <div
                      key={key}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                              <Icon className="w-4 h-4" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-base">{formattedTitle}</h4>
                          </div>
                          {getSectionStatusBadge(review.status)}
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mt-2">
                          {review.feedback}
                        </p>

                        {review.suggestions && review.suggestions.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-slate-200/60">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                              Recommendations:
                            </span>
                            <ul className="space-y-1.5">
                              {review.suggestions.map((sug, sIdx) => (
                                <li key={sIdx} className="text-xs text-slate-700 flex items-start gap-2">
                                  <span className="text-blue-500 font-bold">•</span>
                                  <span>{sug}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ATS Issues & Missing Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ATS Issues */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-4 text-slate-900">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold">ATS Compliance Barriers</h3>
                </div>
                {result.analysis.atsIssues && result.analysis.atsIssues.length > 0 ? (
                  <ul className="space-y-2.5">
                    {result.analysis.atsIssues.map((issue, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs sm:text-sm text-indigo-900 leading-relaxed flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No critical ATS compliance barriers detected.</p>
                )}
              </div>

              {/* Missing Information */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-4 text-slate-900">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <h3 className="text-lg font-bold">Missing or Weak Information</h3>
                </div>
                {result.analysis.missingInformation && result.analysis.missingInformation.length > 0 ? (
                  <ul className="space-y-2.5">
                    {result.analysis.missingInformation.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs sm:text-sm text-rose-900 leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">All standard core resume fields are present.</p>
                )}
              </div>
            </div>

            {/* Prioritized Improvements / Action Plan */}
            {result.analysis.improvements && result.analysis.improvements.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-5 text-slate-900">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-bold">Priority Action Items</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.analysis.improvements.map((imp, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-amber-50/30 border border-amber-200/80 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed">
                          {imp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CvAnalyzer;
