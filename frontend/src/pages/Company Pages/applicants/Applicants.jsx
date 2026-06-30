import { useEffect, useState } from "react";
import api from "../../../services/api";
import CompanyNavbar from "../../../components/CompanyNavbar";

const Applicants = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const res = await api.get("/applicants");
            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatusChange = async (applicationId, status) => {

        try {

            await api.put(`/applicants/${applicationId}`, {
                status,
            });

            setJobs((prevJobs) =>
                prevJobs.map((job) => ({
                    ...job,
                    applicants: job.applicants.map((applicant) =>
                        applicant.id === applicationId
                            ? { ...applicant, status }
                            : applicant
                    ),
                }))
            );

        } catch (err) {
            console.log(err);
            alert("Failed to update status");
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <CompanyNavbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                                Applicants
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {jobs.reduce((total, job) => total + job.applicants.length, 0)} total applicants across {jobs.length} jobs
                            </p>
                        </div>
                    </div>
                </div>

                {/* Jobs List */}
                {jobs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
                        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-1">
                            No jobs found
                        </h3>
                        <p className="text-sm text-slate-500">
                            Post a job to start receiving applications
                        </p>
                        <button
                            onClick={() => navigate("/company/post-job")}
                            className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            Post a Job
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-300"
                            >
                                {/* Job Header */}
                                <div className="px-4 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 truncate">
                                                {job.title}
                                            </h2>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium w-fit">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {job.applicants.length} {job.applicants.length === 1 ? 'Applicant' : 'Applicants'}
                                        </span>
                                    </div>
                                </div>

                                {/* Applicants Table - Desktop */}
                                {job.applicants.length === 0 ? (
                                    <div className="p-6 sm:p-8 text-center">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            No applicants yet for this position
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Desktop Table View */}
                                        <div className="hidden md:block overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                                        <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                                Name
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                                Email
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Status
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                            <div className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                Resume
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {job.applicants.map((applicant) => (
                                                        <tr
                                                            key={applicant.id}
                                                            className="hover:bg-slate-50/50 transition-colors duration-150"
                                                        >
                                                            <td className="px-6 py-4">
                                                                <span className="text-sm font-medium text-slate-800">
                                                                    {applicant.name}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="text-sm text-slate-600 break-all">
                                                                    {applicant.email}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <select
                                                                    value={applicant.status}
                                                                    onChange={(e) =>
                                                                        handleStatusChange(
                                                                            applicant.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className={`
                                                                        w-full max-w-[140px]
                                                                        px-3 py-1.5
                                                                        text-sm font-medium
                                                                        rounded-lg
                                                                        border border-slate-200
                                                                        bg-white
                                                                        focus:outline-none
                                                                        focus:ring-2
                                                                        focus:ring-blue-500/20
                                                                        focus:border-blue-500
                                                                        transition-all
                                                                        duration-200
                                                                        cursor-pointer
                                                                        ${applicant.status === 'pending' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                                                                        applicant.status === 'shortlisted' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                                                                        applicant.status === 'interview' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                                                                        'text-red-700 bg-red-50 border-red-200'}
                                                                    `}
                                                                >
                                                                    <option value="pending" className="text-amber-700 bg-amber-50">
                                                                        Pending
                                                                    </option>
                                                                    <option value="shortlisted" className="text-emerald-700 bg-emerald-50">
                                                                        Shortlisted
                                                                    </option>
                                                                    <option value="interview" className="text-blue-700 bg-blue-50">
                                                                        Interview
                                                                    </option>
                                                                    <option value="rejected" className="text-red-700 bg-red-50">
                                                                        Rejected
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <a
                                                                    href={`http://localhost:8080/api/applicants/resume/${applicant.resume_id}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="
                                                                    inline-flex items-center gap-1.5
                                                                    px-3.5 py-1.5
                                                                    bg-blue-50
                                                                    text-blue-700
                                                                    text-sm
                                                                    font-medium
                                                                    rounded-lg
                                                                    hover:bg-blue-100
                                                                    hover:shadow-sm
                                                                    transition-all
                                                                    duration-200
                                                                    "
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile Card View */}
                                        <div className="md:hidden divide-y divide-slate-100">
                                            {job.applicants.map((applicant) => (
                                                <div key={applicant.id} className="p-4 hover:bg-slate-50/50 transition-colors duration-150">
                                                    <div className="space-y-3">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-800">
                                                                    {applicant.name}
                                                                </p>
                                                                <p className="text-xs text-slate-500 break-all mt-0.5">
                                                                    {applicant.email}
                                                                </p>
                                                            </div>
                                                            <select
                                                                value={applicant.status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(
                                                                        applicant.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className={`
                                                                    px-2.5 py-1
                                                                    text-xs font-medium
                                                                    rounded-lg
                                                                    border border-slate-200
                                                                    bg-white
                                                                    focus:outline-none
                                                                    focus:ring-2
                                                                    focus:ring-blue-500/20
                                                                    focus:border-blue-500
                                                                    transition-all
                                                                    duration-200
                                                                    cursor-pointer
                                                                    ${applicant.status === 'pending' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                                                                    applicant.status === 'shortlisted' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                                                                    applicant.status === 'interview' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                                                                    'text-red-700 bg-red-50 border-red-200'}
                                                                `}
                                                            >
                                                                <option value="pending" className="text-amber-700 bg-amber-50">
                                                                    Pending
                                                                </option>
                                                                <option value="shortlisted" className="text-emerald-700 bg-emerald-50">
                                                                    Shortlisted
                                                                </option>
                                                                <option value="interview" className="text-blue-700 bg-blue-50">
                                                                    Interview
                                                                </option>
                                                                <option value="rejected" className="text-red-700 bg-red-50">
                                                                    Rejected
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <a
                                                                href={`http://localhost:8080/api/applicants/resume/${applicant.resume_id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="
                                                                inline-flex items-center gap-1.5
                                                                px-3 py-1.5
                                                                bg-blue-50
                                                                text-blue-700
                                                                text-xs
                                                                font-medium
                                                                rounded-lg
                                                                hover:bg-blue-100
                                                                hover:shadow-sm
                                                                transition-all
                                                                duration-200
                                                                w-full
                                                                justify-center
                                                                "
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                Download Resume
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applicants;