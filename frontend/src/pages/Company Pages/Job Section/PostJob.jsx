import { useState } from "react";
import api from "../../../services/api";
import CompanyNavbar from "../../../components/CompanyNavbar";
import { useNavigate } from "react-router-dom";

const PostJob = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        skills: "",
        location: "",
        salary_min: "",
        salary_max: "",
        deadline: ""
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post(
                "/jobs",
                form
            );
            alert("Job posted successfully");
            navigate("/company/profile");
        }
        catch(error){
            console.log(error);
            alert("Failed to post job");

        }

    };


    return (

<div>
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50">
        <CompanyNavbar />
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">

            {/* Header */}
            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                        Post New Job
                    </h1>
                </div>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-6 sm:py-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Job Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Junior Frontend Developer"
                            value={form.title}
                            onChange={handleChange}
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
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            value={form.description}
                            onChange={handleChange}
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
                            resize-none
                            "
                            required
                        />
                    </div>

                    {/* Skills */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Skills Required
                        </label>
                        <input
                            type="text"
                            name="skills"
                            placeholder="React, Node.js, TypeScript, SQL"
                            value={form.skills}
                            onChange={handleChange}
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
                        <p className="text-xs text-slate-400">Separate skills with commas</p>
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Dhaka or Remote"
                            value={form.location}
                            onChange={handleChange}
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
                    </div>

                    {/* Salary Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Minimum Salary
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
                                <input
                                    type="number"
                                    name="salary_min"
                                    placeholder="0"
                                    value={form.salary_min}
                                    onChange={handleChange}
                                    className="
                                    w-full
                                    pl-7 pr-4 py-2.5
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
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Maximum Salary
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
                                <input
                                    type="number"
                                    name="salary_max"
                                    placeholder="0"
                                    value={form.salary_max}
                                    onChange={handleChange}
                                    className="
                                    w-full
                                    pl-7 pr-4 py-2.5
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
                            </div>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Application Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={form.deadline}
                            onChange={handleChange}
                            className="
                            w-full
                            px-4 py-2.5
                            bg-slate-50
                            border border-slate-200
                            rounded-lg
                            text-sm text-slate-800
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            "
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200/60">
                        <button
                            type="submit"
                            className="
                            w-full sm:w-auto
                            px-8 py-2.5
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
                            rounded-lg
                            hover:bg-blue-700
                            hover:shadow-md
                            transition-all
                            duration-200
                            flex items-center justify-center gap-2
                            "
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post Job
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/company/dashboard")}
                            className="
                            w-full sm:w-auto
                            px-6 py-2.5
                            text-sm
                            font-medium
                            text-slate-600
                            hover:text-slate-900
                            hover:bg-slate-100
                            rounded-lg
                            transition-all
                            duration-200
                            "
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</div>
    );
};

export default PostJob;
