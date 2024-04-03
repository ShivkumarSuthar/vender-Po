const express = require('express');
const logoView = express.Router();
const path = require('path'); // Import path module for file path manipulation
const organizationModel = require("../../models/user/organizationModel");

logoView.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params; // Extract logo parameter from request params
        const organizationData = await organizationModel.findOne({ _id }); // Assuming logo is a unique identifier

        if (!organizationData) {
            return res.status(404).send("No data found"); // Send a default logo file if organization data not found
        }

        // Construct the file path to the image based on the logo field in organizationData
        const filePath = path.join(__dirname, `../../uploads/logo/${organizationData.logo}`);

        // Set the appropriate content type for the image
        res.contentType('image/jpeg'); // Adjust content type based on your image format

        // Send the image file as a response
        res.sendFile(filePath);
    } catch (e) {
        console.error(e);
        res.status(500).send("No data found"); // Send a default logo file in case of internal server error
    }
});

module.exports = logoView;
