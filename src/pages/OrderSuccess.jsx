import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold mb-2">Payment successful</h1>
      <p className="text-gray-600 mb-6">Thank you! Your payment was processed.</p>
      <Link to="/" className="px-5 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Back to Home</Link>
    </div>
  );
}

export default OrderSuccess;



