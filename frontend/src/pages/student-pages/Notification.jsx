import { useEffect, useState, useMemo } from "react";
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  Inbox
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | unread | read

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !n.is_read);
    if (filter === "read") return notifications.filter((n) => n.is_read);
    return notifications;
  }, [notifications, filter]);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Clean Standard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                  Notifications
                </h1>
                {unreadCount > 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {unreadCount} New
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    All Caught Up
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Application updates, status changes, and recruiter activity
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 self-start sm:self-auto"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "unread"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "read"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {/* Notifications List / Empty State */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-5 border border-slate-200/80 animate-pulse h-20" />
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              When recruiters review your profile or update the status of an application, notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`relative bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex items-start justify-between gap-4 ${
                  !n.is_read
                    ? "border-blue-300 shadow-sm bg-blue-50/20"
                    : "border-slate-200/80 shadow-xs hover:border-slate-300"
                }`}
              >
                {!n.is_read && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600 rounded-l-2xl" />
                )}

                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      !n.is_read
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-snug">
                      {n.message}
                    </p>
                    {n.created_at && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(n.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    )}
                  </div>
                </div>

                {!n.is_read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-xl transition-all"
                  >
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notification;
