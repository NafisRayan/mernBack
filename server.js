//server.js

const express = require('express');
const session = require('express-session');
const app = express();
const port = 5000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// Middleware for parsing JSON
app.use(express.json());


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Configure session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
      httpOnly: false,
    },
  })
);

// Registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.session.user = user; // Store user information in the session

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Endpoint to save threed data to user
app.post('/data', async (req, res) => {
  const { username, password, threed } = req.body;

try {  // Find user
  const user = await User.findOne({ username });

  // Save threed data to user
  user.threed = JSON.parse(threed);

  await user.save();

  res.sendStatus(200);}
  catch (error) {res.status(505).json({ error: 'new user threed problem' })}

});

// Endpoint to fetch threed data for authenticated user
app.get('/threed', async (req, res) => {
 const { username, password } = req.query;

 // Find user
 const user = await User.findOne({ username });

 if (!user || user.password !== password) {
  res.sendStatus(401); // Unauthorized
 } else {
  res.send(user.threed);
 }
});




connectDB();

app.listen(port, () => {
  console.log('Server is listening on Port 5000');
});