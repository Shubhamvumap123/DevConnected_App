const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, description, link } = req.body;
  const project = await Project.create({ userId: req.user.id, title, description, link });
  res.status(201).json(project);
});

router.get('/', async (req, res) => {
  const { search } = req.query;
  let projects = [];
  if (search) {
    projects = await Project.find({ title: { $regex: search, $options: 'i' } });
  } else {
    projects = await Project.find();
  }
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, link } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Check ownership
    if (project.userId.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Check ownership
    if (project.userId.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:projectId/comments', auth, async (req, res) => {
  const { projectId } = req.params;
  const { name, text } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.comments.push({ userId: req.user.id, name, text });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
