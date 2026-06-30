import { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, is_read: true } : n
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put("/notifications/read-all");

            setNotifications((prev) =>
                prev.map((n) => ({
                    ...n,
                    is_read: true,
                }))
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50">
        <StudentNavbar />
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                        Notifications
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {notifications.filter(n => !n.is_read).length} unread • {notifications.length} total
                    </p>
                </div>
            </div>
            
            <button
                onClick={markAllAsRead}
                disabled={loading || notifications.every(n => n.is_read)}
                className="
                px-5 py-2.5
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
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:shadow-none
                "
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark All Read
            </button>
        </div>

        {/* Notifications List */}
        {loading ? (
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                <p className="text-sm text-slate-500 mt-3">Loading notifications...</p>
            </div>
        ) : notifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">
                    No notifications
                </h3>
                <p className="text-sm text-slate-500">
                    You're all caught up! Check back later for updates.
                </p>
            </div>
        ) : (
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`bg-white rounded-xl shadow-sm border ${
                            notification.is_read
                                ? "border-slate-200/80"
                                : "border-blue-500/50 shadow-md shadow-blue-500/5"
                        } hover:shadow-md transition-all duration-300 overflow-hidden`}
                    >
                        <div className="p-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {/* Unread dot */}
                                        {!notification.is_read && (
                                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                        )}
                                        
                                        {/* Title */}
                                        <h2 className={`text-base font-semibold ${
                                            notification.is_read ? "text-slate-700" : "text-slate-900"
                                        }`}>
                                            {notification.title}
                                        </h2>
                                        
                                        {/* Type badge */}
                                        <span
                                            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                                                notification.type === "job"
                                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                    : notification.type === "status"
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                    : notification.type === "application"
                                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                    : "bg-slate-50 text-slate-700 border border-slate-200"
                                            }`}
                                        >
                                            {notification.type === "job" && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {notification.type === "status" && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {notification.type === "application" && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            )}
                                            {notification.type}
                                        </span>
                                    </div>

                                    {/* Message */}
                                    <p className={`mt-2 text-sm ${
                                        notification.is_read ? "text-slate-600" : "text-slate-700"
                                    } leading-relaxed`}>
                                        {notification.message}
                                    </p>

                                    {/* Timestamp */}
                                    <div className="flex items-center gap-1.5 mt-3">
                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-xs text-slate-400">
                                            {new Date(notification.created_at).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Mark Read Button */}
                                {!notification.is_read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="
                                        flex-shrink-0
                                        px-4 py-2
                                        bg-emerald-50
                                        text-emerald-700
                                        text-sm
                                        font-medium
                                        rounded-lg
                                        hover:bg-emerald-100
                                        hover:shadow-sm
                                        transition-all
                                        duration-200
                                        flex items-center gap-1.5
                                        self-start
                                        "
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mark Read
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>
    );
};

export default Notification;

