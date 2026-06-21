import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        navigate("/"); 
      }
    };

    checkUser();
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Home;