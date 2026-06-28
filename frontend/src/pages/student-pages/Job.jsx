import { useEffect, useState } from "react";
import api from "../../services/api.js";



import StudentNavbar from "../../components/StudentNavbar.jsx";
import JobPostCard from "../../components/student-section/JobPostCard.jsx";

const Job = () => {

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await api.get(
                "/student-jobs"
            );
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    
    {/* Navbar Section */}
    <div className="sticky top-0 z-50">
        <StudentNavbar />
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header with Stats */}
        <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Available Jobs
                </h1>
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {jobs.length}
                </span>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-2">
                <span>🕐</span>
                <span>Updated just now • Find your dream career</span>
            </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
                <span>💼</span>
                <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{jobs.length}</span> Jobs
                </span>
            </div>
            
            </div>
        </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
        {jobs.map((job) => (
            <div 
            key={job.id}
            className="transform transition-all duration-300 hover:-translate-y-1"
            >
            <JobPostCard job={job} />
            </div>
        ))}
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
        <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 text-sm">
                We couldn't find any job openings at the moment. Please check back later.
            </p>
            </div>
        </div>
        )}
    </div>
    </div>
    );
};

export default Job;