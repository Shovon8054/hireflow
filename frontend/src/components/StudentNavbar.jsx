import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const StudentNavbar = () => {

    const navigate=useNavigate();

    const handleLogout=async()=>{
        try{
            await api.post("/auth/logout");
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div>
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
            to="/student"
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight"
        >
            HireFlow
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">

            {/* Jobs */}
            <Link
            to="#"
            className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
            Jobs
            </Link>


            {/* Notifications */}
            <Link
            to="#"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
            <span className="text-2xl">🔔</span>

            <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[11px] font-semibold text-white bg-red-500 rounded-full ring-2 ring-white">
                3
            </span>
            </Link>


            {/* Profile */}
            <Link
            to="/student/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
            >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                S
            </div>

            <span className="font-medium text-gray-700">
                Profile
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
  )
}

export default StudentNavbar
