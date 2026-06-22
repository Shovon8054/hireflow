import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";


const StudentProfile = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    university: "",
    skills: "",
    education: ""
  });

  const [loading, setLoading] = useState(true);

  // ================= GET PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        if (res.data) {
          setForm(res.data);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE PROFILE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/profile", form);
      alert("Profile saved successfully");
      navigate(-1);
    } catch (err) {
      alert("Error saving profile");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="university"
          placeholder="University"
          value={form.university || ""}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node, etc)"
          value={form.skills || ""}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="education"
          placeholder="Education"
          value={form.education || ""}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

      </form>
    </div>
  );
};

export default StudentProfile;
