const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// POST route at /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = data.filter(item => !isNaN(item)); // Filter numbers
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item)); // Filter alphabets

  const highestLowercase = alphabets
    .filter(item => /^[a-z]$/.test(item))
    .sort()
    .pop() || null; // Get highest lowercase alphabet

  // Construct response
  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with your actual user ID
    email: "john@xyz.com", // Replace with your actual email
    roll_number: "ABCD123", // Replace with your actual roll number
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  };

  res.status(200).json(response);
});

// GET route at /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
