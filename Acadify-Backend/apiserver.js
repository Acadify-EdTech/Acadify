const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/quizdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const questionSchema = new mongoose.Schema({}, { strict: false }); // Use a non-strict schema to allow any structure
const Question = mongoose.model('Question', questionSchema, 'questions'); // The 'questions' collection

app.get('/api/questions', async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});