import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import StudentNavbar from "../components/StudentNavbar";

const ShowStudentProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "Student Name",
        university: "Not Added",
        education: "Not Added",
        skills: "Not Added"
    });

    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const res = await api.get("/profile");

                if(res.data){
                    setProfile({
                        name: res.data.name || "Student Name",
                        university: res.data.university || "Not Added",
                        education: res.data.education || "Not Added",
                        skills: res.data.skills || "Not Added"
                    });
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();

    }, []);


    return (
<div className="min-h-screen bg-slate-50">
    <StudentNavbar />

    <div className="max-w-5xl mx-auto py-8 px-4">

        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80">

            {/* Body */}
            <div className="px-8 py-8">


                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-8 border-b border-slate-200/60">


                    {/* Left */}
                    <div className="flex items-center gap-5">


                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl font-semibold text-white tracking-tight">
                                {profile?.name?.charAt(0).toUpperCase() || "S"}
                            </span>
                        </div>



                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                                {profile.name}
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Student • Job Seeker
                            </p>
                            <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                    Active
                                </span>
                            </div>
                        </div>

                    </div>



                    {/* Button */}
                    <button
                        onClick={() => navigate("/student/profile")}
                        className="
                        px-6 py-2.5
                        rounded-lg
                        bg-slate-900
                        text-white
                        text-sm
                        font-medium
                        hover:bg-slate-800
                        hover:shadow-md
                        transition-all
                        duration-200
                        flex items-center gap-2
                        whitespace-nowrap
                        "
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                    </button>

                </div>



                {/* Information */}
                <div className="grid md:grid-cols-2 gap-5 mt-8">


                    {/* University */}
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                University
                            </span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium">
                            {profile.university || "Not Added"}
                        </p>
                    </div>



                    {/* Education */}
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Education
                            </span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium">
                            {profile.education || "Not Added"}
                        </p>
                    </div>



                    {/* Skills - Full Width */}
                    <div className="md:col-span-2 pt-2 border-t border-slate-200/60 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Skills
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {profile.skills
                                ? profile.skills.split(",").map((skill, index) => (
                                      <span
                                          key={index}
                                          className="
                                          px-3 py-1.5
                                          rounded-md
                                          bg-slate-100
                                          text-slate-700
                                          text-xs
                                          font-medium
                                          border border-slate-200/50
                                          "
                                      >
                                          {skill.trim()}
                                      </span>
                                  ))
                                : (
                                    <p className="text-sm text-slate-400">
                                        No skills added
                                    </p>
                                  )}
                        </div>
                    </div>

                </div>


            </div>

        </div>

    </div>

</div>
    );
};

export default ShowStudentProfile;