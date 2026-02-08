const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  link: String,
  comments: [CommentSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);