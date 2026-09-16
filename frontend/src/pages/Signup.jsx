import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, GraduationCap, Building2, Sparkles, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (error) setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", form);
      setSuccess(res.data.message || "Account created! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check your details.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen relative flex flex-col items-center justify-center bg-slate-950 px-4 py-2 overflow-hidden selection:bg-blue-500/30">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-sm sm:max-w-md relative z-10 my-auto">
        {/* Brand Header - Compact */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-1.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-semibold tracking-wider text-blue-300 uppercase">
              Join The Platform
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1 font-heading">
            Create Your <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">Account</span>
          </h1>
          <p className="text-xs text-slate-400">
            Find opportunities or hire exceptional talent
          </p>
        </div>

        {/* Card Container - Compact */}
        <div className="glass-card-dark rounded-2xl shadow-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Feedback Banners */}
          {error && (
            <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200 leading-snug">
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200 leading-snug">
                {success}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Segmented Role Selector */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("student")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    form.role === "student"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("company")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    form.role === "company"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company</span>
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                {form.role === "company" ? "Company Name" : "Full Name"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder={form.role === "company" ? "Acme Technologies" : "Sarah Jenkins"}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 text-white placeholder-slate-500 text-xs sm:text-sm border border-slate-700/80 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 text-white placeholder-slate-500 text-xs sm:text-sm border border-slate-700/80 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 text-white placeholder-slate-500 text-xs sm:text-sm border border-slate-700/80 pl-9 pr-10 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 hover:bg-right transition-all duration-300 text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-slate-900 px-2 text-slate-500 tracking-wider font-medium">
                Already registered?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full py-1.5 px-3 rounded-xl border border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 text-slate-200 text-xs font-medium hover:border-slate-600 transition-all duration-200"
            >
              Sign In with existing account
            </Link>
          </div>
        </div>

        {/* Security badge footer - Compact */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
          <span>Encrypted with modern web security standards</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;