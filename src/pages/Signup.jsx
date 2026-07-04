import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role is "customer"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2s
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={`min-h-screen surface ${theme === 'light' ? 'light' : ''} flex items-center justify-center px-4 py-16`}>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl overflow-hidden shadow-2xl border border-[#D9A44D]/25">
        {/* Brand side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#1E1A15] border-r border-[#D9A44D]/20 text-[#ECE3D0] p-10">
          <p className="lux-script text-2xl mb-3">Join Us</p>
          <h2 className="font-display text-3xl font-semibold capitalize text-gold mb-3">Create Your Account</h2>
          <div className="lux-divider" />
          <p className="text-muted-warm text-center text-sm">Join us and enjoy exclusive offers.</p>
        </div>
        {/* Form side */}
        <div className="lux-card p-8 md:p-10">
          <h2 className="font-display text-3xl font-semibold capitalize text-gold mb-6">Sign Up</h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password (min. 6 characters)
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-colors"
            >
              <option value="customer">Customer</option>
            </select>
          </div>

          <button type="submit" className="btn-lux w-full">
            Register <span className="btn-dash" />
          </button>
        </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-gold hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;