import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} flex items-center justify-center px-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border border-orange-100">
        {/* Brand side */}
        <div className="hidden md:flex flex-col justify-center items-center brand-gradient text-white p-10">
          <h2 className="text-3xl font-extrabold mb-2">Welcome back</h2>
          <p className="opacity-90 text-center">Sign in to manage your orders and account.</p>
        </div>
        {/* Form side */}
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} p-8 md:p-10`}>
          <h1 className="text-3xl font-bold mb-6 brand-text-gradient">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg font-semibold ${
              email && password
                ? "brand-gradient text-white hover:opacity-95"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!email || !password}
          >
            Login
          </button>
          </form>
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline">
              Sign up
            </Link>
          </p>
          <div className="mt-6 text-xs text-center text-gray-500">
            <p>superadmin@gmail.com SuperSecure123</p>
            <p>hmudassir511@gmail.com admin123456</p>
            <p>cus@gmail.com cus123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;