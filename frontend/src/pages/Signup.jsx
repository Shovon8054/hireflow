import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", form);

      alert(res.data.message);

      console.log("User:", res.data.user);

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">

    <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
    >

        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
        Create Account
        </h2>

        <input
        name="name"
        placeholder="Name"
        className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onChange={handleChange}
        />

        <input
        name="email"
        placeholder="Email"
        className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onChange={handleChange}
        />

        <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onChange={handleChange}
        />

        <select
        name="role"
        className="w-full bg-white/10 text-white border border-white/20 p-3 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onChange={handleChange}
        >
        <option value="student" className="text-black">Student</option>
        <option value="company" className="text-black">Company</option>
        </select>

        <button
        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white p-3 rounded-lg font-semibold transition duration-200 shadow-lg"
        >
        Sign Up
        </button>

        <p className="mt-5 text-center text-sm text-gray-300">
        Already have an account?{" "}
        <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign In
        </Link>
        </p>

    </form>

    </div>
  );
};

export default SignUp;