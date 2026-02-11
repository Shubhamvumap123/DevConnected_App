import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectSkeleton = () => (
  <div className="glass p-6 rounded-2xl animate-pulse h-full">
    <div className="h-48 bg-slate-700/50 rounded-xl mb-4 w-full"></div>
    <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
  </div>
);

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">All Projects</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="group block h-full"
            >
              <div className="glass h-full rounded-2xl overflow-hidden border border-white/10 flex flex-col transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-2">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={`https://picsum.photos/seed/${project._id}/800/600`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h2>
                  <p className="text-slate-400 line-clamp-3 text-sm leading-relaxed flex-1">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
