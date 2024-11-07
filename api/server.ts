// api/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authAPI'); // Import auth routes once here
const userRoutes = require('./routes/userAPI');

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // For enabling CORS (if your frontend and backend are on different ports)

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
