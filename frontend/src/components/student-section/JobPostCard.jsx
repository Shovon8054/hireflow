import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  Zap,
  Briefcase,
  Clock
} from "lucide-react";

// Consistent gradient generator based on job title
const getCardGradient = (title = "") => {
  const gradients = [
    "from-blue-600 to-indigo-600",
    "from-indigo-600 to-purple-600",
    "from-sky-500 to-blue-600",
    "from-teal-500 to-emerald-600",
    "from-violet-600 to-indigo-600",
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash += title.charCodeAt(i);
  return gradients[hash % gradients.length];
};

const JobPostCard = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);

  const initials = job.title
    ? job.title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "HF";

  const gradient = getCardGradient(job.title);

  const skillsList = job.skills
    ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top ambient color accent line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      {/* Main Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5 min-w-0">
              {/* Dynamic Company Logo Avatar */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    VERIFIED EMPLOYER
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{job.location || "Remote / Worldwide"}</span>
                </div>
              </div>
            </div>

            {/* Bookmark Action */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-all duration-200 flex-shrink-0 active:scale-90 ${
                isSaved
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-slate-50 border-slate-200/80 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              }`}
              title={isSaved ? "Saved to favorites" : "Save job"}
              aria-label="Save job"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current text-blue-600" : ""}`} />
            </button>
          </div>

          {/* Badges / Highlights */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {job.is_entry_level ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                <Zap className="w-3 h-3 text-emerald-500" />
                Entry Level
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70">
                <Briefcase className="w-3 h-3 text-slate-500" />
                Full-time
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Quick Apply
            </span>
          </div>

          {/* Skills Required */}
          {skillsList.length > 0 && (
            <div className="mb-5">
              <div className="flex flex-wrap gap-1.5">
                {skillsList.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-slate-100/90 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium rounded-lg transition-colors duration-150 border border-slate-200/60"
                  >
                    {skill}
                  </span>
                ))}
                {skillsList.length > 4 && (
                  <span className="px-2 py-1 text-xs text-slate-400 font-medium self-center">
                    +{skillsList.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Salary & Deadline Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
              Compensation
            </span>
            <span className="font-bold text-slate-900 text-xs sm:text-sm">
              {job.salary_min && job.salary_max
                ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
                : job.salary_min
                ? `From $${Number(job.salary_min).toLocaleString()}`
                : job.salary_max
                ? `Up to $${Number(job.salary_max).toLocaleString()}`
                : "Competitive Pay"}
            </span>
          </div>

          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
              Apply By
            </span>
            <span className="font-medium text-slate-700 text-xs sm:text-sm truncate block">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "Rolling admission"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
        <Link
          to={`/student/jobs/${job.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          <span>View Opportunity</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default JobPostCard;