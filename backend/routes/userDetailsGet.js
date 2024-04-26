const express = require("express");
const userDetailsGet = express();
const userDetailsModel = require("../models/userDetailsModel");

userDetailsGet.get("/getUserDetails", async (req, res) => {
    
   
        try {
            const userData = await userDetailsModel.find();
            res.status(200).send(userData); // Send the newly created user data
        } catch (e) {
            res.status(500).send("Something went wrong: " + e);
        }
    
});

module.exports = userDetailsGet;
