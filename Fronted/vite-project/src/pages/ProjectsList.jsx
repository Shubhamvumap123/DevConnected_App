import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {projects.map(project => (
        <div key={project._id} className="mb-4">
          <h2 className="text-xl">{project.title}</h2>
          <p>{project.description}</p>
          <Link to={`/projects/${project._id}`} className="text-blue-500 underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
