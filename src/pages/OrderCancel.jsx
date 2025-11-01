import { Link } from "react-router-dom";

function OrderCancel() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold mb-2">Payment cancelled</h1>
      <p className="text-gray-600 mb-6">You can try again or pay on delivery.</p>
      <Link to="/cart" className="px-5 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Back to Cart</Link>
    </div>
  );
}

export default OrderCancel;



