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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'));
});

// API routes
app.use('/api', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
