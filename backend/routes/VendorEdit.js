// Import necessary modules
const express = require('express');
const vendorModel = require("../models/vendor");

// Create a new instance of express router
const vendorEdit = express.Router();

// API endpoint for updating vendor details by ID
vendorEdit.put("/editVendor/:vendorId", async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        // Find the vendor by ID
        const vendor = await vendorModel.findById(vendorId);

        if (!vendor) {
            return res.status(404).send("Vendor not found");
        }

        // Update vendor details with the data from request body
        vendor.set(req.body);

        // Save the updated vendor
        await vendor.save();

        res.send("Vendor details updated successfully");
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});

module.exports = vendorEdit;
