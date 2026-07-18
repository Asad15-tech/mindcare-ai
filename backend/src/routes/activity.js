const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { exercise, sleep, water } = req.body;
    const newActivity = new Activity({ userId: req.user.userId, exercise, sleep, water });
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Activity.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
