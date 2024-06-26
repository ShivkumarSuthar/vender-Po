// Import necessary modules
const express = require('express');
const venderModel = require("../../models/vender/vender")

// Create a new instance of express router
const venderEdit = express.Router();

// API endpoint for updating vendor details by ID
venderEdit.put("/edit/:Vender_code", async (req, res) => {
    try {
        const vender_id = req.params.Vender_code;
        // Find the vendor by ID
        const vender = await venderModel.findOne({Vender_code:req.params.Vender_code});

        if (!vender) {
            return res.status(404).send("Vendor not found");
        }

        // Update vendor details with the data from request body
        vender.set(req.body);

        // Save the updated vender
        await vender.save();

        res.status(201).send(vender );
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});

module.exports = venderEdit;
