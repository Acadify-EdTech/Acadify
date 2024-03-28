const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quizdb');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/questions', async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('quizdb');
    const questions = await db.collection('questions').find().toArray();
    res.json(questions);
    client.close();
});

let activeUsers = {};

app.post('/api/heartbeat', (req, res) => {
    const userId = req.body.userId;
    activeUsers[userId] = Date.now();
    res.status(200).json({ message: 'Heartbeat received' });
});

// Check every 10 seconds for users who haven't sent a heartbeat recently
setInterval(() => {
    const now = Date.now();
    for (let userId in activeUsers) {
        if (now - activeUsers[userId] > 15000) {
            delete activeUsers[userId];
        }
    }
}, 10000);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});