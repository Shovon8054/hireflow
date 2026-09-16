import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import api from "../services/api";

const AdminNavbar = () => {
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
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users Directory", path: "/admin/users", icon: Users },
    { name: "Create Admin", path: "/admin/create-admin", icon: UserPlus },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800 shadow-md text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-300 to-white bg-clip-text text-transparent tracking-tight font-heading">
                  HireFlow
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  Admin
                </span>
              </div>
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
                      ? "bg-purple-600/25 text-purple-300 border border-purple-500/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="h-5 w-[1px] bg-slate-800 mx-2" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 px-4 pt-3 pb-5 space-y-1 shadow-2xl">
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
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-800 mt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 text-sm font-medium transition-all"
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

export default AdminNavbar;