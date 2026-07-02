import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../services/api";

const Users = () => {
    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const [studentRes, companyRes] = await Promise.all([
                api.get("/admin/users/students"),
                api.get("/admin/users/companies"),
            ]);

            setStudents(studentRes.data);
            setCompanies(companyRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBlock = async (id, currentStatus) => {
        try {
            await api.put(`/admin/users/block/${id}`, {
                is_blocked: !currentStatus,
            });

            fetchUsers();
        } catch (err) {
            console.log(err);
            alert("Failed to update user.");
        }
    };

    if (loading) {
        return (
            <div>
                <AdminNavbar />
                <h2 className="text-center mt-10 text-xl">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <AdminNavbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                            User Management
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Manage students and companies • {students.length + companies.length} total users
                        </p>
                    </div>
                </div>

                {/* ================= Students Section ================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden mb-8 hover:shadow-md transition-all duration-300">
                    <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                                    Students
                                </h2>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {students.length}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Name
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Status
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-slate-50/50 transition-colors duration-150"
                                    >
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm font-medium text-slate-800">
                                                {student.name}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {student.email}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            {student.is_blocked ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    Blocked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleBlock(
                                                        student.id,
                                                        student.is_blocked
                                                    )
                                                }
                                                className={`
                                                    px-4 py-1.5
                                                    rounded-lg
                                                    text-xs font-medium
                                                    transition-all duration-200
                                                    ${
                                                        student.is_blocked
                                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                                                            : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                                                    }
                                                `}
                                            >
                                                {student.is_blocked ? (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Unblock
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                        Block
                                                    </span>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= Companies Section ================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                                    Companies
                                </h2>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {companies.length}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Company
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Industry
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Status
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {companies.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="hover:bg-slate-50/50 transition-colors duration-150"
                                    >
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm font-medium text-slate-800">
                                                {company.company_name || company.name}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {company.industry || "-"}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {company.email}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            {company.is_blocked ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    Blocked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleBlock(
                                                        company.id,
                                                        company.is_blocked
                                                    )
                                                }
                                                className={`
                                                    px-4 py-1.5
                                                    rounded-lg
                                                    text-xs font-medium
                                                    transition-all duration-200
                                                    ${
                                                        company.is_blocked
                                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                                                            : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                                                    }
                                                `}
                                            >
                                                {company.is_blocked ? (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Unblock
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                        Block
                                                    </span>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;