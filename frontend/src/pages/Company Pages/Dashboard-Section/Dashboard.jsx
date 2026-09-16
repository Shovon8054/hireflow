import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Briefcase, 
  PlusCircle, 
  Users, 
  Search, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles 
} from "lucide-react";
import api from "../../../services/api";
import CompanyNavbar from "../../../components/CompanyNavbar";
import JobPostCard from "../../../components/company-job-post/JobPostCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs");
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.is_active).length;
    const expired = total - active;
    return { total, active, expired };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase()));

      if (statusFilter === "active") return matchesSearch && job.is_active;
      if (statusFilter === "expired") return matchesSearch && !job.is_active;
      return matchesSearch;
    });
  }, [jobs, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-500/20">
      <CompanyNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Employer Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Recruitment Center
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Monitor active postings, review applications, and publish new roles
            </p>
          </div>

          <Link
            to="/company/post-job"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>

        {/* Dynamic Metrics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Total Jobs Posted
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-heading">
                {stats.total}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Active Openings
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 font-heading">
                {stats.active}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <Link
            to="/company/applicants"
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-5 shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all duration-200 flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider block mb-1">
                Candidate Pipeline
              </span>
              <span className="text-base font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Review Applicants →
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posted jobs by title, skill, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "active"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setStatusFilter("expired")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "expired"
                  ? "bg-white text-slate-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Expired ({stats.expired})
            </button>
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200/80 animate-pulse h-40" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-5">
            {filteredJobs.map((job) => (
              <JobPostCard
                key={job.id}
                job={job}
                fetchJobs={fetchJobs}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-lg mx-auto p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1 font-heading">
              {searchQuery ? "No matching jobs found" : "No job openings posted yet"}
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              {searchQuery
                ? "Try clearing your search query to see all your posted listings."
                : "Publish your first open position to connect with qualified applicants."}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              >
                Clear Search
              </button>
            ) : (
              <Link
                to="/company/post-job"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job Opening</span>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;