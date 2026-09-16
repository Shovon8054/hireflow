import { Link } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Trash2, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  DollarSign
} from "lucide-react";
import api from "../../services/api.js";

const JobPostCard = ({ job, fetchJobs }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the job posting "${job.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${job.id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.location || "Remote / Unspecified"}</span>
                <span>•</span>
                <span className="text-slate-400">ID #{job.id}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {job.is_active ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Listing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
                <Clock className="w-3.5 h-3.5" />
                Expired
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {/* Compensation */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Salary Range
            </span>
            <p className="text-sm font-bold text-slate-800">
              {job.salary_min && job.salary_max
                ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
                : job.salary_min
                ? `From $${Number(job.salary_min).toLocaleString()}`
                : job.salary_max
                ? `Up to $${Number(job.salary_max).toLocaleString()}`
                : "Competitive / Unspecified"}
            </p>
          </div>

          {/* Deadline */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Application Deadline
            </span>
            <p className="text-sm font-medium text-slate-700">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "No deadline set"}
            </p>
          </div>

          {/* Experience Level */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Experience
            </span>
            <p className="text-sm font-medium text-slate-700">
              {job.is_entry_level ? "Entry Level" : "Experienced Professional"}
            </p>
          </div>
        </div>

        {/* Skills Required */}
        {job.skills && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Required Competencies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.split(",").map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-2">
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Listing</span>
        </button>

        <Link
          to="/company/applicants"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
        >
          <Users className="w-4 h-4" />
          <span>View Candidates</span>
        </Link>
      </div>
    </div>
  );
};

export default JobPostCard;