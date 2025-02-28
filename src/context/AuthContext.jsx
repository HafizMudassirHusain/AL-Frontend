import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
  
    if (storedToken && storedRole) {
      setUser({ name: storedName, role: storedRole });
    }
  }, []);
  

  // ✅ Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
      const loggedInUser = { name: response.data.name, role: response.data.role };

     localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify({ name: response.data.name, role: response.data.role, userId: response.data.userId })); // ✅ Store full user object
console.log("✅ Login Success - Full Response:", response.data);

      setUser(loggedInUser);
    } catch (error) {
      console.error("Login Failed:", error.response ? error.response.data : error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Remove full user object
    window.location.href = "/login"; // ✅ Redirect to login after logout
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
