import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, GraduationCap, Sparkles, CheckCircle2, Save, Loader2 } from "lucide-react";
import api from "../services/api.js";
import StudentNavbar from "../components/StudentNavbar";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    university: "",
    skills: "",
    education: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/profile");
        if (res.data) {
          setForm({
            university: res.data.university || "",
            skills: res.data.skills || "",
            education: res.data.education || ""
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      await api.post("/profile", form);
      setFeedback({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => {
        navigate("/student/show-profile");
      }, 1200);
    } catch (err) {
      setFeedback({ type: "error", message: "Error updating profile. Please try again." });
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <button
          onClick={() => navigate("/student/show-profile")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Profile View</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="mb-6 pb-6 border-b border-slate-100">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Edit Student Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Update your background, qualifications, and core technical skills
            </p>
          </div>

          {feedback.message && (
            <div
              className={`mb-5 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                feedback.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-rose-50 border-rose-300 text-rose-800"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : null}
              <span>{feedback.message}</span>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-slate-400 animate-pulse space-y-4">
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-24 bg-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* University */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  University / College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="university"
                    placeholder="e.g. Stanford University, MIT, Dhaka University"
                    value={form.university}
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-900 text-sm border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Education / Major */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Degree & Education Details
                </label>
                <div className="relative">
                  <textarea
                    name="education"
                    placeholder="e.g. B.Sc. in Computer Science & Engineering (2022–2026)"
                    value={form.education}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-slate-50 text-slate-900 text-sm border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Skills (Comma Separated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g. React, Node.js, TypeScript, PostgreSQL, UI/UX"
                    value={form.skills}
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-900 text-sm border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Separate each skill with a comma to create tags automatically
                </p>
              </div>

              {/* Submit */}
              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/student/show-profile")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
