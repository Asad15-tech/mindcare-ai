const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { mood, moodScore, note } = req.body;
    const newMood = new Mood({ userId: req.user.userId, mood, moodScore, note });
    await newMood.save();
    res.json(newMood);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Mood.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
