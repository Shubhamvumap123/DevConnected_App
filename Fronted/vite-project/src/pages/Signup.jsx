import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
    window.location = '/login';
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input className="block w-full p-2 mb-2 border" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="block w-full p-2 mb-2 border" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="block w-full p-2 mb-2 border" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSignup}>Signup</button>
    </div>
  );
}