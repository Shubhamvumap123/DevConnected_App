import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="font-bold">DevConnect</Link>
      <div>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
