import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Briefcase, 
  FileText, 
  Bot, 
  User, 
  ArrowRight, 
  Sparkles, 
  GraduationCap,
  TrendingUp,
  FileCheck,
  Zap
} from "lucide-react";
import api from "../services/api";
import StudentNavbar from "../components/StudentNavbar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StudentNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-pulse space-y-8">
            <div className="h-56 bg-slate-200 rounded-3xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-52 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Extract first name cleanly for personalized welcome
  const firstName = user.name ? user.name.trim().split(" ")[0] : "Candidate";

  const quickActions = [
    {
      title: "Explore Open Roles",
      desc: "Browse curated jobs from top verified companies and apply seamlessly.",
      link: "/student/job",
      icon: Briefcase,
      badge: null,
      bgLight: "bg-blue-50 text-blue-600 border border-blue-100/80",
      accentHover: "group-hover:text-blue-600 group-hover:border-blue-200",
    },
    {
      title: "HireFlow AI Advisor",
      desc: "Get instant resume advice, role recommendations, and interview practice.",
      link: "/student/chatbot",
      icon: Bot,
      badge: "AI Coach",
      badgeColor: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
      bgLight: "bg-indigo-50 text-indigo-600 border border-indigo-100/80",
      accentHover: "group-hover:text-indigo-600 group-hover:border-indigo-200",
    },
    {
      title: "AI CV Analyzer",
      desc: "Upload CV for instant ATS scoring, section audit, and tailored feedback.",
      link: "/student/cv-analyzer",
      icon: FileCheck,
      badge: "New AI",
      badgeColor: "bg-purple-50 text-purple-700 border border-purple-200/60",
      bgLight: "bg-purple-50 text-purple-600 border border-purple-100/80",
      accentHover: "group-hover:text-purple-600 group-hover:border-purple-200",
    },
    {
      title: "Application Status",
      desc: "Track interview stages, feedback, and application decisions in real time.",
      link: "/student/application-history",
      icon: FileText,
      badge: null,
      bgLight: "bg-emerald-50 text-emerald-600 border border-emerald-100/80",
      accentHover: "group-hover:text-emerald-600 group-hover:border-emerald-200",
    },
    {
      title: "Manage Profile",
      desc: "Highlight your verified skills, education, and portfolio to recruiters.",
      link: "/student/show-profile",
      icon: User,
      badge: null,
      bgLight: "bg-amber-50 text-amber-600 border border-amber-100/80",
      accentHover: "group-hover:text-amber-600 group-hover:border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Welcome Hero Banner */}
        <section className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-r from-[#070e24] via-[#0d1c44] to-[#0a1532] p-8 sm:p-12 lg:p-14 text-white shadow-2xl shadow-blue-950/25 border border-slate-800/80">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Stylized Watermark Briefcase Outline matching reference */}
          <div className="absolute right-4 sm:right-10 bottom-0 top-0 hidden md:flex items-center justify-end pointer-events-none select-none opacity-20 text-blue-300">
            <svg 
              className="w-64 h-64 lg:w-80 lg:h-80 -mr-6 -mb-6 text-current transition-transform duration-700 hover:scale-105" 
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="25" y="65" width="150" height="115" rx="18" />
              <path d="M65 65V42a18 18 0 0 1 18-18h34a18 18 0 0 1 18 18v23" />
              <path d="M25 112h150" strokeDasharray="6 6" />
              <circle cx="100" cy="112" r="9" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md shadow-xs">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>STUDENT HUB</span>
            </div>

            {/* Headline with Electric Blue Accent */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 font-heading leading-tight">
              Welcome back,{" "}
              <span className="text-[#38bdf8] drop-shadow-xs">
                {firstName}!
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Discover opportunities tailored to your skillset, consult the HireFlow AI career assistant, and take the next step in your career journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/student/job"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/35 hover:shadow-blue-600/50 transition-all duration-200 active:scale-95"
              >
                <span>Browse Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/student/chatbot"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm backdrop-blur-md hover:border-white/30 transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Ask AI Advisor</span>
              </Link>
              <Link
                to="/student/cv-analyzer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/70 border border-indigo-400/30 text-indigo-200 hover:text-white font-medium text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Analyze CV</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Launchpad Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                Launchpad
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Quick access to your core career tools
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  to={action.link}
                  className={`group relative bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl ${action.accentHover} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${action.bgLight} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {action.badge && (
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${action.badgeColor}`}>
                          {action.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {action.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Profile Optimization Callout Banner */}
        <section className="bg-gradient-to-r from-blue-50/90 via-sky-50/80 to-indigo-50/90 border border-blue-200/70 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Keep your profile updated for 3x higher recruiter outreach
              </h3>
              <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                Profiles with full skills and educational details are prioritized by partner employers.
              </p>
            </div>
          </div>
          <Link
            to="/student/profile"
            className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap self-start md:self-auto"
          >
            Update Profile
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;