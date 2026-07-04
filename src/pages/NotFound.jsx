import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[60vh] surface flex flex-col items-center justify-center text-center p-8">
      <p className="lux-script text-3xl mb-2">Oops</p>
      <h1 className="font-display text-4xl font-semibold capitalize text-gold mb-3">Page Not Found</h1>
      <div className="lux-divider" />
      <p className="text-muted-warm mb-8">The page you are looking for doesn&apos;t exist.</p>
      <Link to="/" className="btn-lux">Go Home <span className="btn-dash" /></Link>
    </div>
  );
}

export default NotFound;



