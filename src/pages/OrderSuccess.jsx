import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-[60vh] surface flex flex-col items-center justify-center text-center p-8">
      <p className="lux-script text-3xl mb-2">Thank You</p>
      <h1 className="font-display text-4xl font-semibold capitalize text-gold mb-3">Payment Successful</h1>
      <div className="lux-divider" />
      <p className="text-muted-warm mb-8">Thank you! Your payment was processed.</p>
      <Link to="/" className="btn-lux">Back To Home <span className="btn-dash" /></Link>
    </div>
  );
}

export default OrderSuccess;



