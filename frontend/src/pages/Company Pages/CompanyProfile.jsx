import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import CompanyNavbar from "../../components/CompanyNavbar";

const CompanyProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        company_name: "Company Name",
        industry: "Not Added",
        description: "Not Added",
        website: "Not Added",
        is_approved: false,
        logo: null
    });


    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const res = await api.get("/company-profile");
                if(res.data){
                    setProfile({
                        company_name: res.data.company_name || "Company Name",
                        industry: res.data.industry || "Not Added",
                        description: res.data.description || "Not Added",
                        website: res.data.website || "Not Added",
                        is_approved: res.data.is_approved || false,
                        logo: res.data.logo || null
                    });
                }
            }
            catch(err){
                console.log(err);
            }
        };

        fetchProfile();

    }, []);


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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-900/5 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                                    Company Profile
                                </h1>
                            </div>
                            <button
                                onClick={() => navigate("/company/profile/update")}
                                className="
                                px-5 sm:px-6 py-2.5
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Update Profile
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-6 sm:px-8 py-6 sm:py-8">

                        {/* Logo */}
                        <div className="flex justify-center mb-10">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ring-4 ring-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                                    {profile.logo ? (
                                        <img
                                            src={`data:image/jpeg;base64,${profile.logo}`}
                                            alt="Company logo"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-5xl font-light text-slate-600">
                                            {profile.company_name?.charAt(0).toUpperCase() || "C"}
                                        </span>
                                    )}
                                </div>

                                {/* Approved Badge */}
                                {profile.is_approved && (
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm animate-pulse">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Company Name */}
                            <div className="md:col-span-2 space-y-1.5 pb-4 border-b border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Company Name
                                    </h3>
                                </div>
                                <p className="text-base font-medium text-slate-900">
                                    {profile.company_name || "Not provided"}
                                </p>
                            </div>

                            {/* Industry */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Industry
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-700">
                                    {profile.industry || "Not provided"}
                                </p>
                            </div>

                            {/* Approval Status */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Status
                                    </h3>
                                </div>
                                {profile.is_approved ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Approved
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                        Pending Approval
                                    </span>
                                )}
                            </div>

                            {/* Website */}
                            <div className="md:col-span-2 space-y-1.5 pt-4 border-t border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                                    </svg>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Website
                                    </h3>
                                </div>
                                {profile.website && profile.website !== "Not Added" ? (
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors flex items-center gap-1"
                                    >
                                        {profile.website}
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ) : (
                                    <p className="text-sm text-slate-400">Not provided</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-1.5 pt-4 border-t border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Description
                                    </h3>
                                </div>
                                <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-100">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {profile.description || "No description provided"}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default CompanyProfile;