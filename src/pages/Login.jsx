import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className={`min-h-screen surface ${theme === 'light' ? 'light' : ''} flex items-center justify-center px-4 py-16`}>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl overflow-hidden shadow-2xl border border-[#D9A44D]/25">
        {/* Brand side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#1E1A15] border-r border-[#D9A44D]/20 text-[#ECE3D0] p-10">
          <p className="lux-script text-2xl mb-3">Welcome Back</p>
          <h2 className="font-display text-3xl font-semibold capitalize text-gold mb-3">Fine Dining Awaits</h2>
          <div className="lux-divider" />
          <p className="text-muted-warm text-center text-sm">Sign in to manage your orders and account.</p>
        </div>
        {/* Form side */}
        <div className="lux-card p-8 md:p-10">
          <h1 className="font-display text-3xl font-semibold capitalize text-gold mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
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
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`btn-lux w-full ${
              email && password ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!email || !password}
          >
            Login <span className="btn-dash" />
          </button>
          </form>
          <p className="text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-gold hover:underline">
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