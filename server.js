const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5200;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for each page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ... other routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
