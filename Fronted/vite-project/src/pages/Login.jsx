import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);

        // Basic user object if not returned, to make comments work
        if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
             // Fallback for demo purposes if backend doesn't return user
            localStorage.setItem('user', JSON.stringify({ name: email.split('@')[0], _id: 'dummy_id' }));
        }

        window.location.href = '/projects'; // Force reload to update navbar state if needed
    } catch (err) {
        console.error(err);
        alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/10 backdrop-blur-xl bg-slate-900/50 shadow-2xl relative z-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2 text-white text-center">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8">Sign in to continue your journey</p>

        <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
                <input
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                <input
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20 mt-2"
            >
                Sign In
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
                Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 hover:underline font-medium ml-1">Create one</Link>
            </p>
        </div>
      </div>
    </div>
  );
}
