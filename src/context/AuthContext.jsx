import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const loggedInUser = { name: response.data.name, role: response.data.role };

      // ✅ Save user & token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
    } catch (error) {
      console.error("Login Failed:", error.response ? error.response.data : error);
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
