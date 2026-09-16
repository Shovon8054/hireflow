import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Building, 
  LogOut, 
  Menu, 
  X,
  Briefcase
} from "lucide-react";
import api from "../services/api";

const CompanyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/company/dashboard", icon: LayoutDashboard },
    { name: "Post Job", path: "/company/post-job", icon: PlusCircle },
    { name: "Applicants", path: "/company/applicants", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Brand Emblem */}
          <Link
            to="/company/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent tracking-tight font-heading">
                HireFlow
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 -mt-1 hidden sm:block">
                Employer Hub
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-slate-500"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="h-5 w-[1px] bg-slate-200 mx-1.5" />

            {/* Company Profile */}
            <Link
              to="/company/profile"
              className={`flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isActive("/company/profile") || isActive("/company/profile/update")
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Company Profile</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium transition-all duration-200"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-200 px-4 pt-3 pb-5 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  active
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <Link
            to="/company/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-all"
          >
            <Building className="w-5 h-5" />
            <span>Company Profile</span>
          </Link>

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-600 bg-rose-50/70 hover:bg-rose-100 text-sm font-medium transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;