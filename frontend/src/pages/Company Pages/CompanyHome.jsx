import { Link } from "react-router-dom";
import { 
  Building2, 
  PlusCircle, 
  Users, 
  LayoutDashboard, 
  ArrowRight, 
  Sparkles, 
  Briefcase,
  Building
} from "lucide-react";
import CompanyNavbar from "../../components/CompanyNavbar";

const CompanyHome = () => {
  const actions = [
    {
      title: "View Active Jobs",
      desc: "Manage your existing listings, monitor performance, and update job details.",
      link: "/company/dashboard",
      icon: LayoutDashboard,
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Post New Position",
      desc: "Create and publish new job opportunities to reach qualified candidates.",
      link: "/company/post-job",
      icon: PlusCircle,
      bg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Review Applicants",
      desc: "Review candidate profiles, filter applications, and track candidate pipelines.",
      link: "/company/applicants",
      icon: Users,
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Company Profile",
      desc: "Present your company brand, mission, culture, and website to potential hires.",
      link: "/company/profile",
      icon: Building,
      bg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <CompanyNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl mb-12 border border-slate-800">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-8 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <Building2 className="w-4 h-4" />
              <span>Employer Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-heading">
              Recruit the Best Minds with <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-white bg-clip-text text-transparent">HireFlow</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
              Publish job openings, streamline applicant review workflows, and connect directly with emerging technical and creative talent.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/company/post-job"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a New Job</span>
              </Link>
              <Link
                to="/company/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm backdrop-blur-md transition-all duration-200"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="mb-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Employer Hub
            </h2>
            <p className="text-sm text-slate-500">
              Manage your talent pipeline and company presence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((act, i) => {
              const Icon = act.icon;
              return (
                <Link
                  key={i}
                  to={act.link}
                  className="group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${act.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyHome;
