const express = require('express');
const useCreate = express.Router();
const UserData = require('../../models/user/users');

// Route to handle POST request to create new user data
useCreate.post('/createUser', async (req, res) => {
    try {
        const userData = new UserData(req.body);
        await userData.save(); 
        res.status(201).send(userData); 
    } catch (error) {
        res.status(400).send(error); 
    }
});

module.exports = useCreate;
