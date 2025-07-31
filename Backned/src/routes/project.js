

const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, title, description, link } = req.body;
  const project = await Project.create({ userId, title, description, link });
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

router.post('/:projectId/comments', async (req, res) => {
  const { projectId } = req.params;
  const { userId, name, text } = req.body;
  const project = await Project.findById(projectId);
  project.comments.push({ userId, name, text });
  await project.save();
  res.json(project);
});

module.exports = router;
