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
    await axios.post(`http://localhost:5000/api/projects/${id}/comments`, {
      userId: user._id,
      name: user.name,
      text: comment
    });
    setComment('');
    window.location.reload();
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <a href={project.link} className="text-blue-500 underline">{project.link}</a>

      <div className="mt-4">
        <h3 className="font-bold">Comments</h3>
        {project.comments.map((c, idx) => (
          <p key={idx}><strong>{c.name}:</strong> {c.text}</p>
        ))}

        <textarea className="w-full border p-2 mt-2" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleComment}>Post Comment</button>
      </div>
    </div>
  );
}