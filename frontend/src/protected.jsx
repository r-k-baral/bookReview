import { Navigate } from "react-router-dom";
import Login from "./pages/Login";

function ProtectedLogin() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
}

export default ProtectedLogin;
