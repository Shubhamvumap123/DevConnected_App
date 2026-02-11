import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        window.location.href = '/login';
    } catch (err) {
        console.error(err);
        alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/10 backdrop-blur-xl bg-slate-900/50 shadow-2xl relative z-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2 text-white text-center">Create Account</h2>
        <p className="text-slate-400 text-center mb-8">Join our community of developers</p>

        <form onSubmit={handleSignup} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
                <input
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
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
                Get Started
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
                Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline font-medium ml-1">Sign in</Link>
            </p>
        </div>
      </div>
    </div>
  );
}
