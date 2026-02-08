import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../config';
import Spinner from '../components/Spinner';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', link: '' });

  const getAuthData = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        return { user, token };
    } catch {
        return { user: null, token: null };
    }
  };

  const { user, token } = getAuthData();

  const fetchProject = useCallback(() => {
    setLoading(true);
    axios.get(`${API_URL}/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
        setEditForm({ title: res.data.title, description: res.data.description, link: res.data.link });
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load project details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    if (!user) return toast.error('Please login to comment');

    try {
      const res = await axios.post(`${API_URL}/api/projects/${id}/comments`, {
        name: user.name,
        text: comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProject(res.data);
      setComment('');
      toast.success('Comment added');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add comment');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/api/projects/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProject(res.data);
      setIsEditing(false);
      toast.success('Project updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update project');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted');
      navigate('/projects');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <Spinner />;
  if (!project) return <div className="text-center text-red-500 mt-8">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow space-y-4">
           <h2 className="text-xl font-bold mb-4">Edit Project</h2>
          <input
            type="text"
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={editForm.title}
            onChange={e => setEditForm({...editForm, title: e.target.value})}
            placeholder="Title"
            required
          />
          <textarea
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={editForm.description}
            onChange={e => setEditForm({...editForm, description: e.target.value})}
            placeholder="Description"
            rows="4"
            required
          />
          <input
            type="text"
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={editForm.link}
            onChange={e => setEditForm({...editForm, link: e.target.value})}
            placeholder="Link"
          />
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            {user && ( // Ideally check ownership
              <div className="flex space-x-2">
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                <button onClick={handleDelete} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
              </div>
            )}
          </div>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mb-4 inline-block">
              Visit Project Link
            </a>
          )}
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Comments</h3>
        <div className="space-y-4 mb-6">
          {project.comments.map((c, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow-sm border border-gray-100">
              <p className="font-semibold text-gray-800">{c.name}</p>
              <p className="text-gray-600 mt-1">{c.text}</p>
            </div>
          ))}
          {project.comments.length === 0 && <p className="text-gray-500 italic">No comments yet.</p>}
        </div>

        {user ? (
          <div className="space-y-3">
            <textarea
              className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
            ></textarea>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold shadow-sm"
              onClick={handleComment}
            >
              Post Comment
            </button>
          </div>
        ) : (
            <p className="text-gray-600">Please <a href="/login" className="text-blue-600 hover:underline">login</a> to comment.</p>
        )}
      </div>
    </div>
  );
}
