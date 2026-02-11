const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const { search } = req.query;
  const users = await User.find({ name: { $regex: search, $options: 'i' } });
  res.json(users);
});

module.exports = router;