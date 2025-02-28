import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role is "customer"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
