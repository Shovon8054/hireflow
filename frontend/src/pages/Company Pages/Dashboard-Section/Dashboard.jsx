import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";
import CompanyNavbar from "../../../components/CompanyNavbar";
import JobPostCard from "../../../components/company-job-post/JobPostCard";

const Dashboard = () => {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);


    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs");
            setJobs(res.data);
        }
        catch (err) {
            console.log(err);
       }
    };



    useEffect(() => {
        fetchJobs();
    }, []);




    return (

        <div>
            <div className="sticky top-0 z-50">
                <CompanyNavbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                                Posted Jobs
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} posted
                            </p>
                        </div>
                    </div>
                    
                    {/* Post New Job Button */}
                    <button
                        onClick={() => navigate("/company/post-job")}
                        className="
                        px-5 py-2.5
                        bg-blue-600
                        text-white
                        text-sm
                        font-medium
                        rounded-lg
                        hover:bg-blue-700
                        hover:shadow-md
                        transition-all
                        duration-200
                        flex items-center gap-2
                        whitespace-nowrap
                        "
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Post New Job
                    </button>
                </div>

                {/* Job Listings */}
                {jobs.length > 0 ? (
                    <div className="grid gap-4 sm:gap-5">
                        {jobs.map((job) => (
                            <JobPostCard
                                key={job.id}
                                job={job}
                                fetchJobs={fetchJobs}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
                        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-1">
                            No jobs posted yet
                        </h3>
                        <p className="text-sm text-slate-500">
                            Start by posting your first job opening
                        </p>


                        <button
                            onClick={() => navigate("/company/post-job")}
                            className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            Post Your First Job
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Dashboard;