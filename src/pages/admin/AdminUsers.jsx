import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch All Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Promote/Demote User (Only Super Admin)
  const updateUserRole = async (userId, newRole) => {
    if (!window.confirm("Are you sure you want to change this user's role?")) return;

    try {
      await axios.put(
        `http://localhost:5000/api/auth/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // ✅ Delete User (Only Super Admin)
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ✅ Search Users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Sort Users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    if (sortBy === "role") return a.role.localeCompare(b.role);
    return 0;
  });

  // ✅ Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search & Sorting */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            {userRole === "super-admin" && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id} className="border hover:bg-gray-100 transition duration-300">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                {userRole === "super-admin" && (
                  <td className="border p-2 flex items-center space-x-2">
                    {user.role !== "super-admin" && (
                      <>
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user._id, e.target.value)}
                          className="p-2 border rounded"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastUser >= sortedUsers.length}
          className="px-3 py-1 border rounded bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
