const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes for each HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'test.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'contact.html'));
});

app.get('/quizportal',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'pages', 'quizportal.html'));
});

app.post('/run', function(req, res) {
  const fs = require('fs');
  fs.writeFileSync('temp.cpp', req.body.code);

  const compile = spawn('g++', ['temp.cpp']);
  compile.on('close', function (code) {
    if (code !== 0) {
      return res.send('Compilation error');
    }

    const run = spawn('./a.out');
    let output = '';

    run.stdout.on('data', function (data) {
      output += data.toString();
    });

    run.on('close', function (code) {
      res.send(output);
    });
  });
});
// Add more routes for other HTML files as needed

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
