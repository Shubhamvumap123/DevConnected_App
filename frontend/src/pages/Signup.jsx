import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { API_URL } from '../config';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      <div className="space-y-4">
        <input
          className="block w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="block w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
