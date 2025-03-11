import { useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../contexts/AuthContext";

export function useLogout() {
  const { setIsLogged, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setIsLogged(false);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return { logout };
}
