

import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../services/api";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const fetchDashboard = async () => {
        try {

            const res = await api.get("/admin/dashboard");

            setDashboard(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!dashboard) {
        return (
            <>
                <AdminNavbar />
                <div className="p-10 text-center text-xl">
                    Loading Dashboard...
                </div>
            </>
        );
    }

    const cards = [
        {
            title: "Students",
            value: dashboard.totalStudents,
            color: "bg-blue-500",
            icon: "🎓",
        },
        {
            title: "Companies",
            value: dashboard.totalCompanies,
            color: "bg-green-500",
            icon: "🏢",
        },
        {
            title: "Jobs",
            value: dashboard.totalJobs,
            color: "bg-purple-500",
            icon: "💼",
        },
        {
            title: "Applications",
            value: dashboard.totalApplications,
            color: "bg-pink-500",
            icon: "📄",
        },
        {
            title: "Active Jobs",
            value: dashboard.activeJobs,
            color: "bg-emerald-500",
            icon: "✅",
        },
        {
            title: "Expired Jobs",
            value: dashboard.expiredJobs,
            color: "bg-red-500",
            icon: "⌛",
        },
        {
            title: "Blocked Users",
            value: dashboard.blockedUsers,
            color: "bg-gray-700",
            icon: "🚫",
        },
    ];

    return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50">
        <AdminNavbar />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </div>
            <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Overview of platform activity and statistics
                </p>
            </div>
        </div>

        {/* ================= Stats Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className={`${card.color} rounded-2xl shadow-sm border border-white/20 p-5 sm:p-6 text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                                {card.title}
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                                {card.value}
                            </h2>
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* ================= Tables Section ================= */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">

            {/* Recent Applications */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                            Recent Applications
                        </h2>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Student
                                    </div>
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Job
                                    </div>
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Status
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {dashboard.recentApplications.map((app) => (
                                <tr key={app.applied_at + app.student_name} className="hover:bg-slate-50/50 transition-colors duration-150">
                                    <td className="px-4 sm:px-6 py-3">
                                        <span className="text-sm font-medium text-slate-800">
                                            {app.student_name}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">
                                        <span className="text-sm text-slate-600">
                                            {app.job_title}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 text-center">
                                        <span className={`
                                            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                            ${app.status === "pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                              app.status === "shortlisted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                              app.status === "interview" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                              "bg-red-50 text-red-700 border border-red-200"}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                app.status === "pending" ? "bg-amber-500" :
                                                app.status === "shortlisted" ? "bg-emerald-500" :
                                                app.status === "interview" ? "bg-blue-500" :
                                                "bg-red-500"
                                            }`}></span>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Latest Jobs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                            Latest Jobs
                        </h2>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Job
                                    </div>
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Company
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {dashboard.latestJobs.map((job) => (
                                <tr key={job.title + job.company_name} className="hover:bg-slate-50/50 transition-colors duration-150">
                                    <td className="px-4 sm:px-6 py-3">
                                        <span className="text-sm font-medium text-slate-800">
                                            {job.title}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {job.company_name}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
    );
};

export default AdminDashboard;