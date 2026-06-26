import { Link } from "react-router-dom";
import api from "../../services/api.js";

const JobPostCard = ({ job, fetchJobs }) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/jobs/${job.id}`);
            alert("Job deleted successfully");
            fetchJobs();
        }
        catch (err) {
            console.log(err);
            alert("Failed to delete job");
        }

    };


    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all duration-300 p-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                        {job.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-slate-600">
                            {job.location || "Location not specified"}
                        </span>
                    </div>
                </div>
                
                {/* Status Badge */}
                <div className="flex-shrink-0">
                    {job.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Expired
                        </span>
                    )}
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                
                {/* Skills */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Skills
                        </span>
                    </div>
                    <div className="text-sm text-slate-700">
                        {job.skills ? (
                            <div className="flex flex-wrap gap-1.5">
                                {job.skills.split(',').map((skill, index) => (
                                    <span key={index} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-slate-400">No skills listed</span>
                        )}
                    </div>
                </div>

                {/* Salary */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Salary Range
                        </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                        {job.salary_min && job.salary_max ? (
                            <>${job.salary_min} - ${job.salary_max}</>
                        ) : (
                            <span className="text-slate-400 font-normal">Not specified</span>
                        )}
                    </p>
                </div>

                {/* Deadline */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Deadline
                        </span>
                    </div>
                    <p className="text-sm text-slate-700">
                        {job.deadline ? (
                            new Date(job.deadline).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })
                        ) : (
                            <span className="text-slate-400">No deadline set</span>
                        )}
                    </p>
                </div>

                {/* Job Type */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Job Type
                        </span>
                    </div>
                    <p className="text-sm text-slate-700">
                        {job.is_entry_level ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Entry Level
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Experienced
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                <Link
                    to={`/company/jobs/edit/${job.id}`}
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                </Link>

                <button
                    onClick={handleDelete}
                    className="px-5 py-2.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>

                

                

                {/* ==========================view applicants================================= */}
                <Link
                    to={`#`}
                    className="ml-auto px-5 py-2.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-all duration-200 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Applicants
                </Link>
            </div>
        </div>


    );

};

export default JobPostCard;