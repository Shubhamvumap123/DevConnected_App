import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects`)
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProject(found);
      });
  }, [id]);

  const handleComment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Please login to comment");
        return;
    }
    await axios.post(`http://localhost:5000/api/projects/${id}/comments`, {
      userId: user._id,
      name: user.name,
      text: comment
    });
    setComment('');
    window.location.reload();
  };

  if (!project) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-xl animate-pulse">
            <div className="h-8 w-64 bg-slate-700/50 rounded mb-4"></div>
            <div className="h-4 w-96 bg-slate-700/50 rounded"></div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
            <img
                src={`https://picsum.photos/seed/${project._id}/1920/1080`}
                alt={project.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto pb-16">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">{project.title}</h1>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                >
                    Visit Project
                </a>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <div className="glass p-8 rounded-2xl border border-white/10 backdrop-blur-xl bg-slate-900/50">
                    <h2 className="text-2xl font-bold mb-4 text-white">About the Project</h2>
                    <p className="text-slate-300 leading-relaxed text-lg">{project.description}</p>
                </div>

                {/* Comments Section */}
                <div className="glass p-8 rounded-2xl border border-white/10 backdrop-blur-xl bg-slate-900/50">
                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                        Comments
                        <span className="text-sm bg-white/10 px-2 py-0.5 rounded-full text-slate-300">{project.comments ? project.comments.length : 0}</span>
                    </h3>

                    <div className="space-y-6">
                        {(!project.comments || project.comments.length === 0) ? (
                            <p className="text-slate-500 italic text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                        ) : (
                            project.comments.map((c, idx) => (
                            <div key={idx} className="flex gap-4 group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <img
                                    src={`https://i.pravatar.cc/150?u=${c.userId || idx}`}
                                    alt={c.name}
                                    className="w-10 h-10 rounded-full border border-white/20 flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5 hover:border-white/10 transition-colors">
                                        <p className="font-bold text-white text-sm mb-1">{c.name}</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">{c.text}</p>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 ml-2">Posted recently</p>
                                </div>
                            </div>
                            ))
                        )}
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Leave a comment</label>
                        <textarea
                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-y min-h-[100px]"
                            placeholder="Share your thoughts on this project..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleComment}
                                disabled={!comment.trim()}
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block space-y-6">
                 <div className="glass p-6 rounded-2xl sticky top-24 border border-white/10 backdrop-blur-xl bg-slate-900/50">
                    <h3 className="text-lg font-bold mb-4 text-white">Project Details</h3>
                    <div className="space-y-4 text-slate-400 text-sm">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>Status</span>
                            <span className="text-green-400 font-medium">Active</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>Last Updated</span>
                            <span className="text-white">Today</span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span>License</span>
                            <span className="text-white">MIT</span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
