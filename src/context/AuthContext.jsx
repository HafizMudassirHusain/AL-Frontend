import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  // Auto logout after 30 minutes of inactivity
  useEffect(() => {
    let timeout;
    if (user) {
      timeout = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minutes
    }
    return () => clearTimeout(timeout);
  }, [user]);

  // Login function (No Changes)
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      console.error("Login Failed:", error.response ? error.response.data : error);
    }
  };

  // Logout function (No Changes)
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
