import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../config';
import Spinner from '../components/Spinner';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load projects');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
            <Link to={`/projects/${project._id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              View Details
            </Link>
          </div>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-gray-500 text-center">No projects found.</p>
      )}
    </div>
  );
}
