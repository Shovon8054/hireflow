import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../services/api";

const CreateAdmin = () => {
    const [admins, setAdmins] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const fetchAdmins = async () => {
        try {
            const res = await api.get("/admin/admins");
            setAdmins(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/admin/create-admin", form);

            alert("Sub Admin created successfully.");

            setForm({
                name: "",
                email: "",
                password: "",
            });

            fetchAdmins();

        } catch (err) {
            console.log(err);

            alert(
                err.response?.data?.message ||
                "Failed to create admin."
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this Sub Admin?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/admin/admins/${id}`);

            alert("Sub Admin deleted.");

            fetchAdmins();

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Delete failed."
            );

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <AdminNavbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                            Admin Management
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Manage administrators • {admins.length} total admins
                        </p>
                    </div>
                </div>

                {/* ================= Create Admin ================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden mb-8 hover:shadow-md transition-all duration-300">
                    <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                                Create Sub Admin
                            </h2>
                        </div>
                    </div>

                    <div className="p-5 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
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

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="admin@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
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

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
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
                            </div>

                            <button
                                type="submit"
                                className="
                                w-full
                                px-6 py-3
                                bg-gradient-to-r from-blue-600 to-indigo-600
                                text-white
                                text-sm
                                font-medium
                                rounded-lg
                                hover:from-blue-700 hover:to-indigo-700
                                hover:shadow-md
                                transition-all
                                duration-200
                                flex items-center justify-center gap-2
                                "
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create Sub Admin
                            </button>
                        </form>
                    </div>
                </div>

                {/* ================= Admin List ================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="px-5 sm:px-6 py-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                                    All Admins
                                </h2>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {admins.length}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Name
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Type
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Created
                                        </div>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {admins.map((admin) => (
                                    <tr
                                        key={admin.id}
                                        className="hover:bg-slate-50/50 transition-colors duration-150"
                                    >
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm font-medium text-slate-800">
                                                {admin.name}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {admin.email}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            {admin.admin_type === "SUPER_ADMIN" ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                    SUPER ADMIN
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    SUB ADMIN
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <span className="text-sm text-slate-600">
                                                {new Date(admin.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            {admin.admin_type === "SUPER_ADMIN" ? (
                                                <button
                                                    disabled
                                                    className="
                                                    px-4 py-1.5
                                                    bg-slate-100
                                                    text-slate-400
                                                    text-xs font-medium
                                                    rounded-lg
                                                    cursor-not-allowed
                                                    flex items-center gap-1.5
                                                    justify-center
                                                    "
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    Protected
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDelete(admin.id)}
                                                    className="
                                                    px-4 py-1.5
                                                    bg-red-50 text-red-700
                                                    text-xs font-medium
                                                    rounded-lg
                                                    hover:bg-red-100
                                                    transition-all duration-200
                                                    flex items-center gap-1.5
                                                    justify-center
                                                    border border-red-200
                                                    "
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;
