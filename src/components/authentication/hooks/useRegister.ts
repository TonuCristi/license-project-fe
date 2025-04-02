import { useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { Register } from "../../../types/user.type";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthApi } from "../../../services/AuthApi";

export function useRegister() {
  const { setIsLogged, setToken, setIsLoading, isLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function register(credentials: Register) {
    setIsLoading(true);
    AuthApi.register(credentials)
      .then((res) => {
        setIsLogged(true);
        setToken(res);
        navigate("/");
        localStorage.setItem("token", res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { register, isLoading };
}
