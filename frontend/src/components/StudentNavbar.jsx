import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const StudentNavbar = () => {

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
                            to="#"
                            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        >
                            HireFlow
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2">

                            {/* Jobs */}
                            <Link
                                to="#"
                                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            >
                                Jobs
                            </Link>

                            {/* Notifications */}
                            <Link
                                to="#"
                                className="relative p-2.5 rounded-lg hover:bg-slate-100 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-red-500 rounded-full ring-2 ring-white">
                                    3
                                </span>
                            </Link>

                            {/* Profile */}
                            <Link
                                to="/student/show-profile"
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all duration-200 mx-1"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                    S
                                </div>
                                <span className="font-medium text-sm text-slate-700">
                                    Profile
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
                        
                        {/* Jobs */}
                        <Link
                            to="#"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Jobs
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

                        {/* Profile */}
                        <Link
                            to="/student/show-profile"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                                S
                            </div>
                            <span className="font-medium text-slate-600">
                                Profile
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

export default StudentNavbar;