import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../../services/api.js";

import StudentNavbar
 from "../../components/StudentNavbar";

const JobDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        const fetchJob = async () => {
            try {
                const res = await api.get(

                    `/student-jobs/${id}`

                );
                setJob(res.data);
            }
            catch (err) {
                console.log(err);
            }

        };
        fetchJob();


    }, [id]);

    if (!job) {
        return <h1>Loading...</h1>;

    }


    //================================= handle apply========================
    const handleApply = async () => {

        if (!resume) {

            alert("Please upload your resume.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("job_id", job.id);
            formData.append("resume", resume);

            const res = await api.post(
                "/applications",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            alert(res.data.message);
            setResume(null);
            navigate("/student/job");

        }

        catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            }
            else {
                alert("Something went wrong.");

            }

        }

        finally {
            setLoading(false);

        }

    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50">
        <StudentNavbar />
    </div>

    {/* Main Content */}
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        {/* <button 
        onClick={() => navigate("/student/job")}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
        <span>←</span>
        <span>Back to Jobs</span>
        </button> */}

        {/* Job Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <span>📍</span>
                    {job.location || 'Location not specified'}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                    job.is_entry_level 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                    {job.is_entry_level ? '🎯 Entry Level' : '💼 Experienced'}
                </span>
                </div>
            </div>
            
            {/* Apply Button */}
            {/* <button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
                Apply Now
            </button> */}
            </div>
        </div>

        {/* Body Section */}
        <div className="p-6 sm:p-8 space-y-6">
            
            {/* Description */}
            <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>📄</span>
                Job Description
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                {job.description || 'No description provided'}
                </p>
            </div>
            </div>

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
            
            {/* Skills */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>🛠️</span>
                Skills Required
                </h3>
                <div className="flex flex-wrap gap-1.5">
                {job.skills ? (
                    job.skills.split(',').map((skill, index) => (
                    <span 
                        key={index}
                        className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium"
                    >
                        {skill.trim()}
                    </span>
                    ))
                ) : (
                    <span className="text-gray-500 text-sm">No skills specified</span>
                )}
                </div>
            </div>

            {/* Location */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>📍</span>
                Location
                </h3>
                <p className="text-gray-800 font-medium">
                {job.location || 'Not specified'}
                </p>
            </div>

            {/* Salary */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h3 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>💰</span>
                Salary Range
                </h3>
                <p className="text-gray-800 font-medium">
                {job.salary_min && job.salary_max ? (
                    `$${job.salary_min} - $${job.salary_max}`
                ) : job.salary_min ? (
                    `From $${job.salary_min}`
                ) : job.salary_max ? (
                    `Up to $${job.salary_max}`
                ) : (
                    'Competitive'
                )}
                </p>
            </div>

            {/* Deadline */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>📅</span>
                Application Deadline
                </h3>
                <p className="text-gray-800 font-medium">
                {job.deadline ? (
                    new Date(job.deadline).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                    })
                ) : (
                    'Not specified'
                )}
                </p>
            </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
            onClick={() => navigate("/student/job")}
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-2"
            >
            <span>←</span>
            Back to Jobs
            </button>


            {/* -------------------------apply button--------------------------- */}
            <div className="flex items-center gap-3 mt-4">
                <input
                    type="file"

                    accept=".pdf"

                    onChange={(e) => setResume(e.target.files[0])}
                />

                <button

                    onClick={handleApply}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Applying..." : "Apply"}

                </button>

            </div>
        </div>
        </div>
    </div>
    </div>

    );
};

export default JobDetails;