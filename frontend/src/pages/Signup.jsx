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
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >

        <h2 className="text-xl font-bold mb-4">
          Sign Up
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>

        <button
          className="bg-blue-600 text-white w-full p-2"
        >
          Sign Up
        </button>

        <p className="mt-2 text-sm">
          Already have account?{" "}
          <Link to="/" className="text-blue-600">
            Sign In
          </Link>
        </p>

      </form>

    </div>
  );
};

export default SignUp;