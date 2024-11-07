// api/routes/authAPI.js
const express = require('express');
const router = express.Router();

// Define a sample login route (POST /auth/login)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Authentication logic here (replace with your actual logic)
  if (username === 'testuser' && password === 'password') {
    res.status(200).json({ message: 'Login successful', user: { username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
