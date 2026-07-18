const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

router.post('/', auth, async (req, res) => {
  try {
    const { messages, apiKey } = req.body;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a compassionate mental wellness assistant trained in CBT techniques. Be empathetic, supportive, and helpful. Keep responses concise and warm.' },
          ...messages
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || 'Sorry, I could not respond.';
    res.json({ reply });
  } catch (err) {
    console.log('Chat error:', err.response?.data || err.message);
    res.status(500).json({ reply: 'Error connecting to AI.' });
  }
});

module.exports = router;
