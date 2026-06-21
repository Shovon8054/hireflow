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

      console.log(res.data);

      alert("Login successful");

    //   // optional: store user info (NOT token, because cookie is used)
    //   localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to dashboard
      navigate("/home");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center text-sm">
          Don't have account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signin;