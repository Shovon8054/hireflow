import { useEffect, useState } from "react";
import api from "../../services/api.js";

import StudentNavbar from "../../components/StudentNavbar.jsx";
import JobPostCard from "../../components/student-section/JobPostCard.jsx";

const Job = () => {
    const [jobs, setJobs] = useState([]);

    const [filters, setFilters] = useState({
        skills: "",
        location: "",
        entryLevel: false,
        minSalary: "",
        maxSalary: "",
    });

    const fetchJobs = async () => {
        try {
            const params = new URLSearchParams();

            if (filters.skills)
                params.append("skills", filters.skills);

            if (filters.location)
                params.append("location", filters.location);

            if (filters.entryLevel)
                params.append("entryLevel", true);

            if (filters.minSalary)
                params.append("minSalary", filters.minSalary);

            if (filters.maxSalary)
                params.append("maxSalary", filters.maxSalary);

            const res = await api.get(`/student-jobs?${params.toString()}`);

            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <StudentNavbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                                        Available Jobs
                                    </h1>
                                    <p className="text-sm text-slate-500 mt-0.5">
                                        Find your dream job • {jobs.length} positions available
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                {jobs.length} Jobs
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 mb-8 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-2 mb-5">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <h2 className="text-base font-semibold text-slate-800">
                            Filter Jobs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                        <input
                            type="text"
                            placeholder="Skills"
                            value={filters.skills}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    skills: e.target.value,
                                })
                            }
                            className="
                            w-full
                            px-4 py-2.5
                            bg-slate-50
                            border border-slate-200
                            rounded-lg
                            text-sm text-slate-800
                            placeholder:text-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            "
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={filters.location}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    location: e.target.value,
                                })
                            }
                            className="
                            w-full
                            px-4 py-2.5
                            bg-slate-50
                            border border-slate-200
                            rounded-lg
                            text-sm text-slate-800
                            placeholder:text-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            "
                        />

                        <input
                            type="number"
                            placeholder="Min Salary"
                            value={filters.minSalary}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    minSalary: e.target.value,
                                })
                            }
                            className="
                            w-full
                            px-4 py-2.5
                            bg-slate-50
                            border border-slate-200
                            rounded-lg
                            text-sm text-slate-800
                            placeholder:text-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            "
                        />

                        <input
                            type="number"
                            placeholder="Max Salary"
                            value={filters.maxSalary}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    maxSalary: e.target.value,
                                })
                            }
                            className="
                            w-full
                            px-4 py-2.5
                            bg-slate-50
                            border border-slate-200
                            rounded-lg
                            text-sm text-slate-800
                            placeholder:text-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            "
                        />

                        <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <input
                                type="checkbox"
                                checked={filters.entryLevel}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        entryLevel: e.target.checked,
                                    })
                                }
                                className="
                                w-4 h-4
                                text-blue-600
                                border-slate-300
                                rounded
                                focus:ring-2
                                focus:ring-blue-500/20
                                focus:border-blue-500
                                transition-all
                                duration-200
                                "
                            />
                            <span className="text-sm text-slate-700 font-medium">
                                Entry Level
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            onClick={fetchJobs}
                            className="
                            px-6 py-2.5
                            bg-gradient-to-r from-blue-600 to-indigo-600
                            text-white
                            text-sm
                            font-medium
                            rounded-lg
                            hover:from-blue-700 hover:to-indigo-700
                            hover:shadow-md
                            transition-all
                            duration-200
                            flex items-center gap-2
                            "
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>

                        <button
                            onClick={() => {
                                setFilters({
                                    skills: "",
                                    location: "",
                                    entryLevel: false,
                                    minSalary: "",
                                    maxSalary: "",
                                });

                                api.get("/student-jobs").then((res) => {
                                    setJobs(res.data);
                                });
                            }}
                            className="
                            px-6 py-2.5
                            bg-slate-100
                            text-slate-700
                            text-sm
                            font-medium
                            rounded-lg
                            hover:bg-slate-200
                            transition-all
                            duration-200
                            flex items-center gap-2
                            "
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset
                        </button>
                    </div>
                </div>

                {/* Job Cards */}
                {jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 sm:gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <JobPostCard job={job} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
                        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-700 mb-1">
                            No Jobs Found
                        </h2>
                        <p className="text-sm text-slate-500">
                            Try adjusting your filters or check back later
                        </p>
                        <button
                            onClick={() => {
                                setFilters({
                                    skills: "",
                                    location: "",
                                    entryLevel: false,
                                    minSalary: "",
                                    maxSalary: "",
                                });

                                api.get("/student-jobs").then((res) => {
                                    setJobs(res.data);
                                });
                            }}
                            className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Job;