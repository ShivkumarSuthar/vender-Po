// Import necessary modules
const express = require('express');
const userModel = require("../../models/user/users")

// Create a new instance of express router
const userEdit = express.Router();

// API endpoint for updating vendor details by ID
userEdit.put("/edit/:_id", async (req, res) => {
    try {
        const vender_id = req.params._id;
        // Find the vendor by ID
        const user = await userModel.findById(vender_id);

        if (!user) {    
            return res.status(404).send("user not found");
        }

        // Update vendor details with the data from request body
        user.set(req.body);

        // Save the updated vendor
        await user.save();

        res.status(201).send(user );
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});

module.exports = userEdit;
