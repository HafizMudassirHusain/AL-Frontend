import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you are looking for doesn’t exist.</p>
      <Link to="/" className="px-5 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Go Home</Link>
    </div>
  );
}

export default NotFound;



