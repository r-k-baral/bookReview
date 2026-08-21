import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {

  // Initial token comes from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // LOGIN
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Decode user information
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.log("Invalid token");
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}