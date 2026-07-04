import { Link } from "react-router-dom";

function OrderCancel() {
  return (
    <div className="min-h-[60vh] surface flex flex-col items-center justify-center text-center p-8">
      <p className="lux-script text-3xl mb-2">No Worries</p>
      <h1 className="font-display text-4xl font-semibold capitalize text-gold mb-3">Payment Cancelled</h1>
      <div className="lux-divider" />
      <p className="text-muted-warm mb-8">You can try again or pay on delivery.</p>
      <Link to="/cart" className="btn-lux">Back To Cart <span className="btn-dash" /></Link>
    </div>
  );
}

export default OrderCancel;



