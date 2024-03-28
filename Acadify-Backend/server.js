const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'Acadify-Frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', 'Acadify-Frontend', 'dist', 'Acadify-Frontend', 'browser', 'quizapp')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes for each HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'pages', 'about.html'));
});

app.get('/codeEditorExam', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'pages', 'codeEditorExam.html'));
});

app.get('/codeEditorPractice', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'pages', 'codeEditorPractice.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'pages', 'contact.html'));
});

app.get('/quizportal',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'pages', 'quizportal.html'));
});
//testing of dashboard
app.get('/dashboard2',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'dist', 'Acadify-Frontend', 'browser','quizapp', 'index.html'));
});

app.post('/run', function(req, res) {
  const tempDir = 'temp';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempFilePath = path.join(tempDir, 'temp.cpp');
  fs.writeFileSync(tempFilePath, req.body.code);

  const compile = spawn('g++', [tempFilePath]);
  let compileError = '';

  compile.stderr.on('data', function (data) {
    compileError += data.toString();
  });

  compile.on('close', function (code) {
    if (code !== 0) {
      fs.unlinkSync(tempFilePath); // Delete temp.cpp file
      return res.send('Compilation error: ' + compileError);
    }

    // If no custom input is provided, return an error
    if (!req.body.customInput) {
      return res.status(400).send('No input provided');
    }

    const run = spawn('./a.exe');
    let output = '';

    // Write the custom input to the standard input of the child process
    run.stdin.write(req.body.customInput);
    run.stdin.end();

    run.stdout.on('data', function (data) {
      output += data.toString();
    });

    // Set a time limit for the execution of the child process
    const timeLimit = 5000; // 5 seconds
    const timer = setTimeout(function () {
      run.kill(); // Stop the execution of the child process
      res.status(408).send('Execution timed out'); // Send a 408 status code (Request Timeout)
    }, timeLimit);

    run.on('close', function (code) {
      clearTimeout(timer); // Clear the timer
      if (fs.existsSync(tempFilePath)) { // Check if temp.cpp file exists before deleting
        fs.unlinkSync(tempFilePath);
      }
      const aOutPath = path.join(tempDir, 'a.out');
      if (fs.existsSync(aOutPath)) { // Check if a.out file exists before deleting
        fs.unlinkSync(aOutPath);
      }
      res.send(output);
    });
  });
});

// Add more routes for other HTML files as needed

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
