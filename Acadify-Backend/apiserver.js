const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 4000;

app.use(compression());

app.use(cors());
app.use(bodyParser.json());

const conn1 = mongoose.createConnection('mongodb+srv://harshitshukla:945252786@acadify.zsiyyca.mongodb.net/quizDB');
const conn2 = mongoose.createConnection('mongodb+srv://harshitshukla:945252786@acadify.zsiyyca.mongodb.net/codeDB');

conn1.on('open', () => {
    console.log('Connection 1 to MongoDB established...');
});

conn1.on('error', (err) => {
    console.log(err);
});

conn2.on('open', () => {
    console.log('Connection 2 to MongoDB established...');
});

conn2.on('error', (err) => {
    console.log(err);
});
const questionSchema = new mongoose.Schema({}, { strict: false }); // Use a non-strict schema to allow any structure
const Question = conn1.model('Question', questionSchema, 'questions'); // The 'questions' collection

app.get('/api/questions', async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
});

const questionSchema1 = new mongoose.Schema({}, { strict: false }); // Use a non-strict schema to allow any structure
const Question1 = conn2.model('Question1', questionSchema1, 'questions'); // The 'sample' collection

app.get('/api/questions1', async (req, res) => {
    const questions = await Question1.find({});
    res.json(questions);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});