import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const CompanyNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link
              to="/company/dashboard"
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 flex-shrink-0"
            >
              HireFlow
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">

              {/* Dashboard */}
              <Link
                to="/company/dashboard"
                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              >
                Dashboard
              </Link>

              {/* Post Job */}
              <Link
                to="/company/post-job"
                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              >
                Post Job
              </Link>

              {/* Applicants */}
              <Link
                to="/company/applicants"
                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              >
                Applicants
              </Link>

              {/* Notifications */}
              <Link
                to="#"
                className="relative p-2.5 rounded-lg hover:bg-slate-100 transition-all duration-200 mx-1"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-red-500 rounded-full ring-2 ring-white">
                  2
                </span>
              </Link>

              {/* Company Profile */}
              <Link
                to="/company/profile"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all duration-200 mx-1"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  C
                </div>
                <span className="font-medium text-sm text-slate-700">
                  Company
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="ml-2 px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow-sm hover:bg-red-600 hover:shadow-md transition-all duration-200"
              >
                Logout
              </button>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 py-4 space-y-1">
            
            {/* Dashboard */}
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            {/* Post Job */}
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              Post Job
            </Link>

            {/* Applicants */}
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Applicants
            </Link>

            {/* Notifications */}
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-100 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="font-medium text-slate-600">Notifications</span>
              </div>
              <span className="flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                3
              </span>
            </Link>

            {/* Company Profile */}
            <Link
              to="/company/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                C
              </div>
              <span className="font-medium text-slate-600">
                Company Profile
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all duration-200 mt-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>

          </div>
        )}
      </nav>
    </div>
  );
};

export default CompanyNavbar;