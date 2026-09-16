import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FileText, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Search,
  Briefcase
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const getCompanyGradient = (name = "") => {
  const gradients = [
    "from-blue-600 to-indigo-600",
    "from-indigo-600 to-purple-600",
    "from-teal-600 to-emerald-600",
    "from-purple-600 to-pink-600",
    "from-amber-600 to-orange-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return gradients[hash % gradients.length];
};

const ApplicationHistory = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await api.get("/my-applications");
        setApplications(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((a) => a.status === "pending").length;
    const shortlisted = applications.filter((a) => a.status === "shortlisted" || a.status === "interview").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    return { total, pending, shortlisted, rejected };
  }, [applications]);

  const filteredApps = useMemo(() => {
    if (statusFilter === "all") return applications;
    return applications.filter((a) => a.status === statusFilter);
  }, [applications, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Clean Standard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                  Application History
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {stats.total} Submitted
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Track your active applications, status changes, and recruiter updates
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/student/job")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </button>
        </div>

        {/* Metric Filter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setStatusFilter("all")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              statusFilter === "all"
                ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            }`}
          >
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
              Total Applied
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">
              {stats.total}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("pending")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              statusFilter === "pending"
                ? "bg-amber-50/60 border-amber-400 shadow-sm ring-1 ring-amber-400/30"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            }`}
          >
            <span className="text-[11px] uppercase font-bold text-amber-600 block mb-1">
              Pending Review
            </span>
            <span className="text-2xl font-extrabold text-amber-700 font-heading">
              {stats.pending}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("shortlisted")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              statusFilter === "shortlisted"
                ? "bg-emerald-50/60 border-emerald-400 shadow-sm ring-1 ring-emerald-400/30"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            }`}
          >
            <span className="text-[11px] uppercase font-bold text-emerald-600 block mb-1">
              Advancing / Review
            </span>
            <span className="text-2xl font-extrabold text-emerald-700 font-heading">
              {stats.shortlisted}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("rejected")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              statusFilter === "rejected"
                ? "bg-rose-50/60 border-rose-400 shadow-sm ring-1 ring-rose-400/30"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            }`}
          >
            <span className="text-[11px] uppercase font-bold text-rose-500 block mb-1">
              Archived
            </span>
            <span className="text-2xl font-extrabold text-rose-700 font-heading">
              {stats.rejected}
            </span>
          </button>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200/80 animate-pulse h-32" />
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
              {statusFilter === "all" ? "No applications yet" : `No ${statusFilter} applications`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
              Explore open positions and apply with your profile to start your interview journey.
            </p>
            <Link
              to="/student/job"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => {
              const companyGrad = getCompanyGradient(app.company_name || app.title);
              const companyInitials = (app.company_name || app.title || "CO")
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${companyGrad} text-white font-extrabold text-sm flex items-center justify-center shadow-sm flex-shrink-0`}>
                      {companyInitials}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {app.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-1.5">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.company_name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.location || "Remote"}</span>
                        </div>

                        {app.applied_at && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              Applied {new Date(app.applied_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start sm:self-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        app.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : app.status === "shortlisted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : app.status === "interview"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          app.status === "pending"
                            ? "bg-amber-500"
                            : app.status === "shortlisted"
                            ? "bg-emerald-500"
                            : app.status === "interview"
                            ? "bg-blue-500"
                            : "bg-rose-500"
                        }`}
                      />
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicationHistory;
