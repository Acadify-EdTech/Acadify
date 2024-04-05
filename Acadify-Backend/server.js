const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');
const compression = require('compression');



const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'Acadify-Frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', 'Acadify-Frontend/dist/acadify-frontend/browser')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes for each HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'public', 'index.html'));
});
app.get('/verify' , (req,res) => {
  res.send('Acadify Backend is running');
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

app.get('/quizportal', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend/dist/acadify-frontend/browser/index.html'));
});

//testing of dashboard
app.get('/dashboard2', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Acadify-Frontend', 'dist', 'Acadify-Frontend', 'browser', 'index.html'));
});

app.post('/run', function (req, res) {
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

    const os = require('os');
    const spawn = require('child_process').spawn;

    let executable;

    if (os.platform() === 'win32') {
      executable = './a.exe';
    } else if (os.platform() === 'linux') {
      executable = './a.out';
    } else if (os.platform() === 'darwin') {
      executable = './a.out'; // or whatever the executable is for macOS
    } else {
      console.error('Unsupported platform');
      process.exit(1);
    }

    
    const run = spawn(executable);
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


const { exec } = require('child_process');

app.post('/submitCode', function (req, res) {
  const tempDir = 'temp';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempFilePath = path.join(tempDir, 'temp.cpp');
  fs.writeFileSync(tempFilePath, req.body.code);

  const compile = spawn('g++', ['-o', path.join(tempDir, 'temp'), tempFilePath]);
  let compileError = '';

  compile.stderr.on('data', function (data) {
    compileError += data.toString();
  });

  compile.on('close', function (code) {
    if (code !== 0) {
      if (fs.existsSync(tempFilePath)) { // Check if temp.cpp file exists before deleting
        fs.unlinkSync(tempFilePath); // Delete temp.cpp file
      }
      return res.send('Compilation error: ' + compileError);
    }

    const testCases = req.body.testCases;
    const results = [];

    const promises = testCases.map((testCase) => {
      return new Promise((resolve, reject) => {
        exec(`echo "${testCase.input}" | ./${path.join(tempDir, 'temp')}`, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            const output = stdout.toString();
            const result = {
              input: testCase.input,
              expectedOutput: testCase.output,
              output: output,
              result: output.trim() === testCase.output.trim() ? 'Passed' : 'Failed'
            };
            resolve(result);
          }
        });
      });
    });

    Promise.all(promises)
      .then((results) => {
        if (fs.existsSync(tempFilePath)) { // Check if temp.cpp file exists before deleting
          fs.unlinkSync(tempFilePath); // Delete temp.cpp file
        }
        res.send(results);
      })
      .catch((error) => {
        res.send('Error: ' + error);
      });
  });
});
// Add more routes for other HTML files as needed

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
