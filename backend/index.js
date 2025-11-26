require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI  ).then(() => {
  console.log('MongoDB connected successfully');
  // Start server listening only after successful DB connection
  const server = app.listen(PORT, () => {
    console.log(`Server listening at ${BASE_URL}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });

  app.listen(5000, "localhost", () => {
    console.log("Server is running on http://localhost:5000");
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

// Test endpoint to verify MongoDB connection
app.get('/testmongodb', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: 'MongoDB is connected' });
  } else {
    res.status(500).json({ message: 'MongoDB not connected' });
  }
});

// Catch-all 404 handler for requests to unknown resources
app.use((req, res) => {
  res.status(404).json({
    message: "The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible."
  });
});


