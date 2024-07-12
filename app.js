// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());

// Use the secret key from the environment variable
const sessionSecret = process.env.SESSION_SECRET;

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/user'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
