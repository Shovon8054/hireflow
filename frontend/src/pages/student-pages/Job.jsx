import { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Filter, 
  RotateCcw, 
  Briefcase, 
  Sparkles, 
  SlidersHorizontal, 
  Zap, 
  Building, 
  ArrowUpDown,
  X,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import api from "../../services/api.js";
import StudentNavbar from "../../components/StudentNavbar.jsx";
import JobPostCard from "../../components/student-section/JobPostCard.jsx";

const CATEGORY_PILLS = [
  { label: "All Opportunities", filterKey: "all", value: null },
  { label: "⚡ Entry Level", filterKey: "entryLevel", value: true },
  { label: "🌐 Remote", filterKey: "location", value: "Remote" },
  { label: "💻 Engineering", filterKey: "skills", value: "Developer" },
  { label: "🎨 Design", filterKey: "skills", value: "Design" },
  { label: "🔥 High Pay ($80k+)", filterKey: "minSalary", value: "80000" },
];

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    entryLevel: false,
    minSalary: "",
    maxSalary: "",
  });

  const fetchJobs = async (customFilters = filters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (customFilters.skills) params.append("skills", customFilters.skills);
      if (customFilters.location) params.append("location", customFilters.location);
      if (customFilters.entryLevel) params.append("entryLevel", true);
      if (customFilters.minSalary) params.append("minSalary", customFilters.minSalary);
      if (customFilters.maxSalary) params.append("maxSalary", customFilters.maxSalary);

      const res = await api.get(`/student-jobs?${params.toString()}`);
      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePillClick = (pill) => {
    setActiveCategory(pill.filterKey);
    const newFilters = {
      skills: "",
      location: "",
      entryLevel: false,
      minSalary: "",
      maxSalary: "",
    };

    if (pill.filterKey !== "all") {
      newFilters[pill.filterKey] = pill.value;
    }

    setFilters(newFilters);
    fetchJobs(newFilters);
  };

  const handleReset = () => {
    setActiveCategory("all");
    const emptyFilters = {
      skills: "",
      location: "",
      entryLevel: false,
      minSalary: "",
      maxSalary: "",
    };
    setFilters(emptyFilters);
    fetchJobs(emptyFilters);
  };

  // Client-side sorting
  const sortedJobs = useMemo(() => {
    const list = [...jobs];
    if (sortBy === "salary-high") {
      return list.sort((a, b) => (Number(b.salary_max || b.salary_min || 0)) - (Number(a.salary_max || a.salary_min || 0)));
    }
    if (sortBy === "deadline") {
      return list.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    }
    // Default newest: id desc
    return list.sort((a, b) => b.id - a.id);
  }, [jobs, sortBy]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-500/20">
      <StudentNavbar />

      {/* Compact & Sleek Search Header */}
      <section className="relative bg-gradient-to-r from-[#070e24] via-[#0c193e] to-[#0a1532] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 shadow-md">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          {/* Compact Header Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
                Find Your Next{" "}
                <span className="text-[#38bdf8]">
                  Dream Role
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Discover openings from high-growth startups and verified tech employers.
              </p>
            </div>
            
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Verified Direct Hiring</span>
            </div>
          </div>

          {/* Unified Compact Search Bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-1.5 rounded-2xl shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchJobs();
              }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center"
            >
              {/* Skill / Keyword */}
              <div className="sm:col-span-6 relative flex items-center bg-slate-900/90 rounded-xl px-3 py-2 border border-slate-700/60 focus-within:border-blue-400 transition-all">
                <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skills, or keywords..."
                  value={filters.skills}
                  onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-4 relative flex items-center bg-slate-900/90 rounded-xl px-3 py-2 border border-slate-700/60 focus-within:border-blue-400 transition-all">
                <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Location or 'Remote'..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Action Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-2 px-3.5 rounded-xl shadow-md shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_PILLS.map((pill) => {
              const isSelected = activeCategory === pill.filterKey;
              return (
                <button
                  key={pill.filterKey}
                  onClick={() => handlePillClick(pill)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 backdrop-blur-md active:scale-95 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 ring-1 ring-blue-400"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Controls & Metrics Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Available Positions
            </h2>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Active Filters Reset Chip */}
            {activeFilterCount > 0 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters ({activeFilterCount})</span>
              </button>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer py-0.5"
              >
                <option value="newest">Newest First</option>
                <option value="salary-high">Highest Salary</option>
                <option value="deadline">Expiring Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200/80 animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-slate-200 rounded w-full" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
                <div className="h-10 bg-slate-200 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : sortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
              <JobPostCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-xl mx-auto p-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 font-heading">
              No matching jobs found
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              We couldn't find any positions matching your selected filters. Try broadening your search or resetting filters.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              Show All Opportunities
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Job;