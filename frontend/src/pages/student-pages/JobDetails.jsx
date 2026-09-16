import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  Zap, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Building2
} from "lucide-react";
import api from "../../services/api.js";
import StudentNavbar from "../../components/StudentNavbar";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetchLoading(true);
        const res = await api.get(`/student-jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!resume) {
      setFeedback({ type: "error", message: "Please select your resume (PDF) before applying." });
      return;
    }

    try {
      setLoading(true);
      setFeedback({ type: "", message: "" });
      const formData = new FormData();
      formData.append("job_id", job.id);
      formData.append("resume", resume);

      const res = await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setFeedback({ type: "success", message: res.data.message || "Application submitted successfully!" });
      setTimeout(() => {
        navigate("/student/application-history");
      }, 1500);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "Failed to submit application. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StudentNavbar />
        <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
          <div className="h-10 bg-slate-200 rounded-xl w-32" />
          <div className="h-56 bg-slate-200 rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-28 bg-slate-200 rounded-2xl" />
            <div className="h-28 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StudentNavbar />
        <div className="max-w-lg mx-auto py-20 text-center px-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Job Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            The position you are looking for may have been removed or expired.
          </p>
          <Link
            to="/student/job"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Jobs</span>
          </Link>
        </div>
      </div>
    );
  }

  const initials = job.title
    ? job.title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "HF";

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Navigation Breadcrumb */}
        <button
          onClick={() => navigate("/student/job")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Job Search</span>
        </button>

        {/* Dynamic Color-Graded Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Verified Opportunity
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-400">ID #{job.id}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location || "Remote / Anywhere"}</span>
                  </div>

                  <span className="w-1 h-1 rounded-full bg-slate-300" />

                  {job.is_entry_level ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                      <Zap className="w-3 h-3 text-emerald-500" />
                      Entry Level
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
                      <Briefcase className="w-3 h-3 text-purple-500" />
                      Experienced
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Metric & Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Salary */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl p-5 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Compensation</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 font-heading">
              {job.salary_min && job.salary_max
                ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
                : job.salary_min
                ? `From $${Number(job.salary_min).toLocaleString()}`
                : job.salary_max
                ? `Up to $${Number(job.salary_max).toLocaleString()}`
                : "Competitive Pay"}
            </p>
            <span className="text-[11px] text-emerald-600/80 font-medium">Estimated Annual</span>
          </div>

          {/* Deadline */}
          <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent rounded-2xl p-5 border border-purple-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Deadline</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 font-heading">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "Open Admission"}
            </p>
            <span className="text-[11px] text-purple-600/80 font-medium">Application Window</span>
          </div>

          {/* Location */}
          <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent rounded-2xl p-5 border border-blue-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Workplace</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 font-heading truncate">
              {job.location || "Remote"}
            </p>
            <span className="text-[11px] text-blue-600/80 font-medium">Work Arrangement</span>
          </div>
        </div>

        {/* Skills Required Card */}
        {job.skills && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Required Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/70 shadow-xs"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Role Overview & Responsibilities
          </h3>
          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {job.description || "No description provided for this opening."}
          </div>
        </div>

        {/* Application & Resume Submission Box */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Apply Directly</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
              Ready to submit your application?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6">
              Upload your most recent resume in PDF format. Recruiter review typically takes 24–48 hours.
            </p>

            {/* Feedback alert */}
            {feedback.message && (
              <div
                className={`mb-4 p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold animate-in fade-in duration-200 ${
                  feedback.type === "success"
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-500/20 border-rose-500/40 text-rose-200"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Resume Upload Dropzone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="flex-1 flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl cursor-pointer backdrop-blur-md transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Upload className="w-4 h-4 text-indigo-300 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-200 truncate">
                    {resume ? resume.name : "Select Resume (PDF format)"}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider flex-shrink-0 ml-2">
                  {resume ? "Change" : "Browse"}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0] || null)}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleApply}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:opacity-95 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;