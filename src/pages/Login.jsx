import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <form 
        onSubmit={handleLogin} 
        className="max-w-md mx-auto mt-5 p-5 bg-white shadow-md rounded"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Disable button if inputs are empty */}
        <button 
          type="submit" 
          className={`mt-2 px-4 py-2 rounded ${email && password ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          disabled={!email || !password}
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>

        <p>superadmin@gmail.com SuperSecure123</p>
        <p>hmudassir511@gmail.com admin123456</p>
        <p>cus@gmail.com cus123</p>
      </form>
    </div>
  );
};

export default Login;
