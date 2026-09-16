import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  Edit3, 
  FileText, 
  CheckCircle2, 
  MapPin,
  ArrowRight,
  Briefcase
} from "lucide-react";
import api from "../services/api";
import StudentNavbar from "../components/StudentNavbar";

const ShowStudentProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Student Name",
    university: "",
    education: "",
    skills: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/profile");
        if (res.data) {
          setProfile({
            name: res.data.name || "Student Name",
            university: res.data.university || "",
            education: res.data.education || "",
            skills: res.data.skills || ""
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const initials = profile.name
    ? profile.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "S";

  // Calculate profile completion percentage
  const fields = [profile.name, profile.university, profile.education, profile.skills];
  const filledCount = fields.filter((f) => Boolean(f && f !== "Not Added")).length;
  const completionPercent = Math.round((filledCount / fields.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Profile Header Card - Clean Standard SaaS Layout */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Circular Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl font-heading shadow-md ring-4 ring-blue-50 flex-shrink-0">
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                    {profile.name}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </div>
                
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2">
                  Student • Active Candidate
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open to Opportunities
                  </span>

                  {profile.university && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile.university}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-2.5 self-start sm:self-center">
              <button
                onClick={() => navigate("/student/profile")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <Link
                to="/student/application-history"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95 whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>My Applications</span>
              </Link>
            </div>
          </div>

          {/* Profile Strength Progress */}
          <div className="pt-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-600">Profile Completion</span>
              <span className="font-bold text-blue-600">{completionPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {/* University Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  University / College
                </h3>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {profile.university || "Not added yet"}
                </p>
              </div>
            </div>
            {!profile.university && (
              <button
                onClick={() => navigate("/student/profile")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
              >
                <span>Add university</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Education / Major Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Degree & Education
                </h3>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {profile.education || "Not added yet"}
                </p>
              </div>
            </div>
            {!profile.education && (
              <button
                onClick={() => navigate("/student/profile")}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-2"
              >
                <span>Add education details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Skills & Technologies
              </h3>
            </div>
            <button
              onClick={() => navigate("/student/profile")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Update Skills
            </button>
          </div>

          {profile.skills && profile.skills !== "Not Added" ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-5 text-center">
              <p className="text-xs text-slate-500 mb-2">
                No skills added yet. Add your skills to get matched with jobs.
              </p>
              <button
                onClick={() => navigate("/student/profile")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all"
              >
                Add Skills
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShowStudentProfile;