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
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} flex items-center justify-center px-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border border-orange-100">
        {/* Brand side */}
        <div className="hidden md:flex flex-col justify-center items-center brand-gradient text-white p-10">
          <h2 className="text-3xl font-extrabold mb-2">Create your account</h2>
          <p className="opacity-90 text-center">Join us and enjoy exclusive offers.</p>
        </div>
        {/* Form side */}
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} p-8 md:p-10`}>
          <h2 className="text-3xl font-bold mb-6 brand-text-gradient">Sign Up</h2>

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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-orange-500' : 'border-gray-600 bg-gray-700 focus:ring-orange-400'}`}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg font-semibold brand-gradient text-white hover:opacity-95"
          >
            Register
          </button>
        </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;