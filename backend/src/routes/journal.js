const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newEntry = new Journal({ userId: req.user.userId, content });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Journal.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
