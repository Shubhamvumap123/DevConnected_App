import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    window.location = '/projects';
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input className="block w-full p-2 mb-2 border" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="block w-full p-2 mb-2 border" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
    </div>
  );
}