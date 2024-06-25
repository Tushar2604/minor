const express = require('express');
const collection = require('./config');
const path = require('path');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My EJS Page', message: 'Hello, EJS!' });
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// Login User
app.post('/login', async (req, res) => {
    console.log('Received a login request'); // Server-side logging
    console.log('Username:', req.body.username); // Server-side logging

    try {
        const check = await collection.findOne({ name: req.body.username });

        if (!check) {
            return res.send('User not found');
        }

        const isPasswordMatch = req.body.password === check.password;

        if (!isPasswordMatch) {
            return res.send('Incorrect password');
        }

        res.render('home');
    } catch (error) {
        console.error('Error logging in:', error);
        res.send('An error occurred. Please try again later.');
    }
});

// Signup User
app.post('/signup', async (req, res) => {
    try {
        const newUser = new collection({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
        res.send('Signup successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.send('An error occurred. Please try again later.');
    }
});

// Start server
const port = 5500;
app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`);
});

module.exports = app;
