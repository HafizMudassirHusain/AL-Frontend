import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li><NavLink to="/admin/dashboard" className="p-3 block rounded hover:bg-gray-700">📊 Dashboard</NavLink></li>
          <li><NavLink to="/admin/orders" className="p-3 block rounded hover:bg-gray-700">📦 Manage Orders</NavLink></li>
          <li><NavLink to="/admin/menu" className="p-3 block rounded hover:bg-gray-700">🍽 Manage Menu</NavLink></li>
          <li><NavLink to="/admin/analytics" className="p-3 block rounded hover:bg-gray-700">📈 View Analytics</NavLink></li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
