import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const ApplicationHistory = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const res = await api.get("/my-applications");
                setApplications(res.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchApplications();

    }, []);

    if (loading) {
        return (
            <div>
                <StudentNavbar />
                <h2 className="text-center mt-10 text-xl">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50">
        <StudentNavbar />
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                        Application History
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {applications.length} {applications.length === 1 ? 'application' : 'applications'} submitted
                    </p>
                </div>
            </div>
            
            <button
                onClick={() => navigate(-1)}
                className="
                px-5 py-2.5
                bg-slate-900
                text-white
                text-sm
                font-medium
                rounded-lg
                hover:bg-slate-800
                hover:shadow-md
                transition-all
                duration-200
                flex items-center gap-2
                whitespace-nowrap
                "
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </button>
        </div>

        {/* Application List */}
        {applications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-700 mb-1">
                    No applications found
                </h2>
                <p className="text-sm text-slate-500">
                    Start applying to jobs to see your history here
                </p>
                <button
                    onClick={() => navigate("/student/jobs")}
                    className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Browse Jobs
                </button>
            </div>
        ) : (
            <div className="space-y-4 sm:space-y-5">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="bg-white rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all duration-300 p-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            {/* Left Content */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                                    {app.title}
                                </h2>
                                
                                <div className="mt-2 space-y-1.5">
                                    {/* Company */}
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span className="text-sm text-slate-600">
                                            <span className="font-medium text-slate-700">Company:</span> {app.company_name}
                                        </span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm text-slate-600">
                                            {app.location}
                                        </span>
                                    </div>

                                    {/* Applied Date */}
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-slate-600">
                                            Applied on {new Date(app.applied_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    {/* Deadline */}
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-slate-600">
                                            <span className="font-medium text-slate-700">Deadline:</span> {new Date(app.deadline).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex-shrink-0">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                                    ${
                                        app.status === "pending"
                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                            : app.status === "shortlisted"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            : app.status === "interview"
                                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                        app.status === "pending"
                                            ? "bg-amber-500"
                                            : app.status === "shortlisted"
                                            ? "bg-emerald-500"
                                            : app.status === "interview"
                                            ? "bg-blue-500"
                                            : "bg-red-500"
                                    }`}></span>
                                    {app.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>
    );
};

export default ApplicationHistory;
