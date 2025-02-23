import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-4 text-lg">No items added yet.</p>
      ) : (
        <div className="p-5">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-3 bg-white shadow-md rounded mb-3">
              <h2 className="text-xl font-semibold">{item.name} (x{item.quantity})</h2>
              <p className="text-lg font-bold">Rs. {item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
