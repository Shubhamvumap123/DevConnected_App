import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(project => (
        <Link key={project._id} to={`/projects/${project._id}`} className="border p-4 hover:bg-gray-100">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p>{project.description}</p>
        </Link>
      ))}
    </div>
  );
}