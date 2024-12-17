require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const {messages} = req.body;

    console.log(messages)

    console.log(process.env.GPT_API_URL, process.env.GPT_API_KEY);

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({error: 'Invalid message format. Messages should be an array.'});
    }
    try {
        const response = await axios.post(
            process.env.GPT_API_URL,
            {
                model: 'gpt-4',
                messages: messages,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GPT_API_KEY}`,
                },
                timeout: 60000,
            }
        );

        const completion = response.data.choices[0].message.content;
        res.json({completion});
    } catch (error) {
        console.error('Error generating response:', error.message);

        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);

            if (error.response.data?.error?.message) {
                return res.json({completion: error.response.data.error.message});
            }
        }


        res.status(500).json({error: 'Failed to generate response'});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} \n http://localhost:5000`);
});
