import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      localStorage.removeItem("role");
    } catch (e) {}
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
};

export default Logout;