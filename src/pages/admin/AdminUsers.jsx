// src/pages/admin/AdminUsers.jsx  (or wherever you keep it)
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const token = localStorage.getItem("token");

  // parse stored user (if present)
  const userData = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const userRole = userData?.role;
  const userId = userData?._id || userData?.userId || localStorage.getItem("userId");

  const { theme } = useContext(ThemeContext);

  // colors (consistent with other pages)
  const primaryFrom = "#FF5E62";
  const primaryTo = "#FF9966";
  const accentYellow = "#FFD43B";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const updateUserRole = async (targetUserId, newRole) => {
    if (!window.confirm("Change this user's role?")) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/users/${targetUserId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.map(u => u._id === targetUserId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Failed to update role.");
    }
  };

  const deleteUser = async (targetUserId) => {
    if (!window.confirm("Permanently delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users/${targetUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter(u => u._id !== targetUserId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // Filter & sort logic
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.role || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    if (sortBy === "role") return (a.role || "").localeCompare(b.role || "");
    return 0;
  });

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / usersPerPage));

  // small helpers for classes
  const lightCard = "bg-white text-gray-800";
  const darkCard = "bg-[#111111] text-white";
  const cardBg = theme === "light" ? lightCard : darkCard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-8 rounded-2xl transition-colors duration-300 ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}
    >
      <header className="mb-6 text-center">
        <h1
          className="text-3xl md:text-4xl font-extrabold leading-tight"
          style={{
            background: `linear-gradient(90deg, ${primaryFrom}, ${primaryTo})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          User Management
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-300">
          View, promote or remove users. Actions limited to admins / super-admins.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between mb-5">
        <div className="flex gap-3 w-full md:w-2/3">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name, email or role..."
            className={`flex-1 px-4 py-2 rounded-xl shadow-sm border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-white border-gray-200 focus:ring-orange-300 text-gray-800" : "bg-gray-800 border-gray-700 focus:ring-orange-500 text-white"}`}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-xl shadow-sm border ${theme === "light" ? "bg-white border-gray-200 text-gray-800" : "bg-gray-800 border-gray-700 text-white"}`}
          >
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="role">Sort: Role</option>
          </select>
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="text-sm text-gray-500 dark:text-gray-300 mr-2 hidden md:block">
            Page {currentPage} / {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full font-medium transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "shadow-md" } ${theme === "light" ? "bg-white border" : "bg-gray-800 border-gray-700"}`}
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full font-medium transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "shadow-md"} ${theme === "light" ? "bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white" : "bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white"}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-hidden rounded-2xl shadow-lg border ${theme === "light" ? "border-gray-200" : "border-gray-800"}`}>
        <table className="w-full table-fixed">
       <thead>
  <tr>
    <th
      className={`text-left p-3 font-semibold ${
        theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f0f0f] text-white"
      }`}
    >
      <span
        className="font-bold text-transparent bg-clip-text"
        style={{
          backgroundImage: `linear-gradient(90deg, ${primaryFrom}, ${primaryTo})`,
          WebkitBackgroundClip: "text",
        }}
      >
        Name
      </span>
    </th>

    <th
      className={`text-left p-3 font-semibold ${
        theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f0f0f] text-white"
      }`}
    >
      Email
    </th>

    <th
      className={`text-left p-3 font-semibold ${
        theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f0f0f] text-white"
      }`}
    >
      Role
    </th>

    {(userRole === "admin" || userRole === "super-admin") && (
      <th
        className={`text-center p-3 font-semibold ${
          theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f0f0f] text-white"
        }`}
      >
        Actions
      </th>
    )}
  </tr>
</thead>


          <tbody className={`${theme === "light" ? "bg-white" : "bg-[#0b0b0b]"}`}>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={userRole ? 4 : 3} className="p-6 text-center text-gray-500">No users found</td>
              </tr>
            ) : currentUsers.map((u, idx) => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`${idx % 2 === 0 ? (theme === "light" ? "bg-white" : "bg-[#0b0b0b]") : (theme === "light" ? "bg-gray-50" : "bg-[#071010]")} hover:shadow-md`}
              >
                <td className="p-4 align-middle">
                  <div className="font-medium text-sm">{u.name}</div>
                </td>

                <td className="p-4 align-middle">
                  <div className="text-sm text-gray-600 dark:text-gray-300">{u.email}</div>
                </td>

                <td className="p-4 align-middle">
                  { (userRole === "admin" || userRole === "super-admin") && u._id !== userId ? (
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u._id, e.target.value)}
                      className={`px-3 py-1 rounded-md ${theme === "light" ? "bg-white border" : "bg-gray-800 border-gray-700 text-white"}`}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  ) : (
                    <span className="px-2 py-1 rounded-md text-sm font-medium" style={{ background: u.role === "super-admin" ? accentYellow : "transparent" }}>
                      {u.role}
                    </span>
                  )}
                </td>

                {(userRole === "admin" || userRole === "super-admin") && (
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {u.role !== "super-admin" && u._id !== userId && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => deleteUser(u._id)}
                          className="px-3 py-1 rounded-md bg-red-500 text-white shadow-sm hover:bg-red-600"
                        >
                          Delete
                        </motion.button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer info */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {currentUsers.length} of {sortedUsers.length} users
      </div>
    </motion.div>
  );
};

export default AdminUsers;
