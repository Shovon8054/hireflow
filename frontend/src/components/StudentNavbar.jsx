import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Briefcase, 
  FileText, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bot,
  FileCheck,
  Home as HomeIcon
} from "lucide-react";
import api from "../services/api";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const [notifRes, userRes] = await Promise.allSettled([
          api.get("/notifications/unread-count"),
          api.get("/auth/me")
        ]);
        if (notifRes.status === "fulfilled" && typeof notifRes.value.data?.count === "number") {
          setUnreadCount(notifRes.value.data.count);
        }
        if (userRes.status === "fulfilled" && userRes.value.data?.user) {
          setCurrentUser(userRes.value.data.user);
        }
      } catch (err) {
        // Silently ignore
      }
    };
    fetchNavbarData();
  }, [location.pathname]);

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
    { name: "Home", path: "/home", icon: HomeIcon },
    { name: "Jobs", path: "/student/job", icon: Briefcase },
    { name: "Applications", path: "/student/application-history", icon: FileText },
    { name: "CV Analyzer", path: "/student/cv-analyzer", icon: FileCheck, isSpecial: true },
    { name: "AI Advisor", path: "/student/chatbot", icon: Bot },
  ];

  const getInitials = (name) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Brand Emblem */}
          <Link
            to="/home"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent tracking-tight font-heading">
                HireFlow
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                      : link.isSpecial
                      ? "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/70 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-blue-600" : link.isSpecial ? "text-indigo-500" : "text-slate-500"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="h-5 w-[1px] bg-slate-200 mx-1.5" />

            {/* Notifications */}
            <Link
              to="/student/notification"
              className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                isActive("/student/notification")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white animate-pulse-subtle">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Pill with Initials & Name */}
            <Link
              to="/student/show-profile"
              className={`flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isActive("/student/show-profile") || isActive("/student/profile")
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                {getInitials(currentUser?.name)}
              </div>
              <span className="text-sm font-medium max-w-[100px] truncate">
                {currentUser?.name ? currentUser.name.split(" ")[0] : "Profile"}
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium transition-all duration-200"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
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

      {/* Mobile Drawer Menu */}
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
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <Link
            to="/student/notification"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold text-white bg-rose-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/student/show-profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-all"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
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

export default StudentNavbar;