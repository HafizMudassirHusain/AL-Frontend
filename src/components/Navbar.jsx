import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 shadow-md flex justify-between items-center bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold dark:text-white">MZ Kitchen</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/menu" className="hover:underline">Menu</Link>
        <Link to="/cart" className="hover:underline">
          Cart ({cart.length})
        </Link>
        <Link to="/order" className="hover:underline">Order</Link>
        {user ? (
          <>
            <Link to="/my-orders">My Orders</Link>
            {user.role === "admin" && <Link to="/admin/orders">Admin</Link>}
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
