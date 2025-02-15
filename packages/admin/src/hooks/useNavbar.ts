import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const useNavbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  return { logout, goTo, username };
};
