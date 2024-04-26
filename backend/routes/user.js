// routes/login.js
const express = require('express');
const user = express();



// Fixed login credentials
const fixedUsername = 'admin';
const fixedPassword = 'password';


user.use(express.json());
user.use(express.urlencoded({ extended: true }));

// Login route
user.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(username, password)
    // Check if provided credentials match the fixed credentials
    if (username === fixedUsername && password === fixedPassword) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = user;
