// routes/login.js
const express = require('express');
const user = express();
const userModel = require("../../models/user/users");

user.use(express.json());
user.use(express.urlencoded({ extended: true }));

// Login route (POST request)
user.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await userModel.findOne({ userId: userId });

        if (user) {
            if (user.password === password) {
                res.status(200).send({ message: 'Login successful', user });
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = user;
