import { useEffect, useState } from "react";
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Users, 
  Sparkles,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../services/api";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-slate-200 rounded-2xl w-1/3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div key={n} className="h-32 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Students",
      value: dashboard.totalStudents,
      gradient: "from-blue-600 to-indigo-600",
      icon: GraduationCap,
      description: "Active candidates",
    },
    {
      title: "Companies",
      value: dashboard.totalCompanies,
      gradient: "from-indigo-600 to-purple-600",
      icon: Building2,
      description: "Registered employers",
    },
    {
      title: "Total Jobs",
      value: dashboard.totalJobs,
      gradient: "from-purple-600 to-pink-600",
      icon: Briefcase,
      description: "All published roles",
    },
    {
      title: "Applications",
      value: dashboard.totalApplications,
      gradient: "from-emerald-600 to-teal-600",
      icon: FileText,
      description: "Submissions recorded",
    },
    {
      title: "Active Jobs",
      value: dashboard.activeJobs,
      gradient: "from-teal-600 to-emerald-700",
      icon: CheckCircle2,
      description: "Accepting candidates",
    },
    {
      title: "Expired Jobs",
      value: dashboard.expiredJobs,
      gradient: "from-amber-600 to-orange-600",
      icon: Clock,
      description: "Closed listings",
    },
    {
      title: "Blocked Users",
      value: dashboard.blockedUsers,
      gradient: "from-rose-600 to-red-700",
      icon: ShieldAlert,
      description: "Restricted accounts",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-purple-500/20">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                System Overview
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Platform Analytics
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Live telemetry, system metrics, and real-time user activity
            </p>
          </div>
        </div>

        {/* ================= Stats Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {card.title}
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                      {card.value}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {card.description}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= Tables Section ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recent Applications
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3">Job Title</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboard.recentApplications?.map((app, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">
                        {app.student_name}
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 truncate max-w-xs">
                        {app.job_title}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
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
                      </td>
                    </tr>
                  ))}
                  {(!dashboard.recentApplications || dashboard.recentApplications.length === 0) && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-xs text-slate-400">
                        No recent applications recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Jobs */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Latest Job Postings
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="px-6 py-3">Job Title</th>
                    <th className="px-6 py-3">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboard.latestJobs?.map((job, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">
                        {job.title}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
                          <Building2 className="w-3.5 h-3.5" />
                          {job.company_name}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!dashboard.latestJobs || dashboard.latestJobs.length === 0) && (
                    <tr>
                      <td colSpan="2" className="px-6 py-8 text-center text-xs text-slate-400">
                        No job postings recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;