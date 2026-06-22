import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";


const StudentProfile = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    university: "",
    skills: "",
    education: ""
  });

  const [loading, setLoading] = useState(true);

  // ================= GET PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        if (res.data) {
          setForm(res.data);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE PROFILE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/profile", form);
      alert("Profile saved successfully");
      navigate(-1);
    } catch (err) {
      alert("Error saving profile");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
<div className="max-w-2xl mx-auto p-6">

    <div className="flex items-center gap-3 mb-8">
        <button
            onClick={() => navigate("/student/profile")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Edit Profile
        </h1>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* University */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    University
                </label>
                <input
                    type="text"
                    name="university"
                    placeholder="Enter your university name"
                    value={form.university || ""}
                    onChange={handleChange}
                    className="
                    w-full
                    px-4 py-2.5
                    bg-slate-50
                    border border-slate-200
                    rounded-lg
                    text-sm text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-slate-900/10
                    focus:border-slate-300
                    transition-all
                    duration-200
                    "
                />
            </div>

            {/* Education */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Education
                </label>
                <textarea
                    name="education"
                    placeholder="Enter your education details"
                    value={form.education || ""}
                    onChange={handleChange}
                    rows={3}
                    className="
                    w-full
                    px-4 py-2.5
                    bg-slate-50
                    border border-slate-200
                    rounded-lg
                    text-sm text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-slate-900/10
                    focus:border-slate-300
                    transition-all
                    duration-200
                    resize-none
                    "
                />
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Skills
                </label>
                <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, TypeScript, etc."
                    value={form.skills || ""}
                    onChange={handleChange}
                    className="
                    w-full
                    px-4 py-2.5
                    bg-slate-50
                    border border-slate-200
                    rounded-lg
                    text-sm text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-slate-900/10
                    focus:border-slate-300
                    transition-all
                    duration-200
                    "
                />
                <p className="text-xs text-slate-400">
                    Separate skills with commas
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <button
                    type="submit"
                    className="
                    flex-1
                    px-6 py-2.5
                    bg-slate-900
                    text-white
                    text-sm
                    font-medium
                    rounded-lg
                    hover:bg-slate-800
                    hover:shadow-md
                    transition-all
                    duration-200
                    "
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="
                    px-6 py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    hover:text-slate-900
                    hover:bg-slate-100
                    rounded-lg
                    transition-all
                    duration-200
                    "
                >
                    Cancel
                </button>
            </div>

        </form>
    </div>

</div>
  );
};

export default StudentProfile;
