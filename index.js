
const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: req.body.messages
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Chyba pri volaní OpenAI API", detail: error?.response?.data || error.message });
  }
});

app.get('/', (req, res) => {
  res.send('OpenAI Proxy API je spustené.');
});

app.listen(PORT, () => {
  console.log(`Server beží na porte ${PORT}`);
});
