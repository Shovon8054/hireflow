import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const AdminNavbar = () => {

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
                            to="/student/job"
                            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        >
                            HireFlow
                        </Link>

                       
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-2">

                            <Link
                                to="/admin/dashboard"
                                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/users"
                                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            >
                                Users
                            </Link>

                            <Link
                                to="/admin/companies"
                                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            >
                                Companies
                            </Link>

                            <Link
                                to="/admin/create-admin"
                                className="px-4 py-2 rounded-lg font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            >
                                Create Admin
                            </Link>

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

                        <Link
                            to="/admin/dashboard"
                            className="block px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/users"
                            className="block px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Users
                        </Link>

                        <Link
                            to="/admin/companies"
                            className="block px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Companies
                        </Link>

                        <Link
                            to="/admin/create-admin"
                            className="block px-4 py-3 rounded-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Create Admin
                        </Link>

                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all duration-200"
                        >
                            Logout
                        </button>

                    </div>
)}
            </nav>
        </div>
    );
};

export default AdminNavbar;