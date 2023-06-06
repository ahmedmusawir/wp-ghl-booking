import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    // Clear session storage
    sessionStorage.removeItem("wpJWTUser");
    sessionStorage.removeItem("wpJWTUserId");
    // Updating the state in AuthContext
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return { logout };
};
