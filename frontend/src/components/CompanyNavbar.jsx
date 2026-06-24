import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const CompanyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/company/home"
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight"
          >
            HireFlow
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-6">

            {/* Dashboard */}
            <Link
              to="#"
              className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Dashboard
            </Link>

            {/* Post Job */}
            <Link
              to="#"
              className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Post Job
            </Link>

            {/* Applicants */}
            <Link
              to="#"
              className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Applicants
            </Link>

            {/* Notifications */}
            <Link
              to="#"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <span className="text-2xl">🔔</span>

              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[11px] font-semibold text-white bg-red-500 rounded-full ring-2 ring-white">
                2
              </span>
            </Link>

            {/* Company Profile */}
            <Link
              to="/company/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                C
              </div>

              <span className="font-medium text-gray-700">
                Company
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 hover:shadow-md transition-all duration-300"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default CompanyNavbar;