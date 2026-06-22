import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const res = await api.post("/auth/signin", form);

      const user = res.data.user;

      alert("Login successful");

      // ROLE BASED REDIRECT
      if (user.role === "student") {
        navigate("/home");
      } 
      else if (user.role === "company") {
        navigate("/company/home");
      } 
      else if (user.role === "admin") {
        navigate("/admin/home");
      } 
      else {
        navigate("/home");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">

    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
        Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

        <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
        />

        <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 active:scale-[0.98] text-white p-3 rounded-lg font-semibold transition duration-200 shadow-lg"
        >
            Login
        </button>

        </form>

        <p className="mt-5 text-center text-sm text-gray-300">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium">
            Sign Up
        </Link>
        </p>

    </div>

    </div>
  );
};

export default Signin;