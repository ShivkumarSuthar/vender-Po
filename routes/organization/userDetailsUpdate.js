const express = require("express");
const userDetailsUpdate = express.Router(); // Change to Router() for better organization
const userDetailsModel = require("../../models/user/organizationModel");
const multer = require("multer");

userDetailsUpdate.use(express.json());




// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Route to update user details
userDetailsUpdate.put("/update/:_id", upload.single("files"), async (req, res) => {
    const userId = req.params._id;
    const { address, GSTIN, CIN, PAN, updatedBy } = req.body; // Remove 'logo' from destructuring

    try {        
        // Find the user details by userId
        let user = await userDetailsModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "organization Details not found" }); // Send error message as JSON
        }

        // Update the user details if fields are provided
        if (address) user.address = address;
        if (GSTIN) user.GSTIN = GSTIN;
        if (CIN) user.CIN = CIN;
        if (PAN) user.PAN = PAN;
        if (updatedBy) user.updatedBy = updatedBy

        // Update the 'updatedAt' field
        user.updatedAt = new Date();

        // Update the 'logo' if a file was uploaded
        if (req.file) {
            user.logo = "http://localhost:8000/" + req.file.path; // Assuming 'path' contains the path to the uploaded file
        }

        // Save the updated user details
        await user.save();

        res.status(200).json(user); // Send the updated user data as JSON
    } catch (e) {
        res.status(500).json({ error: "Something went wrong", details: e.message }); // Send detailed error message as JSON
    }
});

module.exports = userDetailsUpdate;
