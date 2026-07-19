const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');
const activityRoutes = require('./routes/activity');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MindHaven Backend Running!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log('DB Error:', err));
