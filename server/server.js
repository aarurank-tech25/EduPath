require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: "EduPath AI Backend is running 🚀"
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`EduPath AI Backend listening on port ${PORT}`);
  console.log(`Google OAuth endpoint: http://localhost:${PORT}/auth/google`);
  console.log(`Google Callback endpoint: http://localhost:${PORT}/auth/google/callback`);
});