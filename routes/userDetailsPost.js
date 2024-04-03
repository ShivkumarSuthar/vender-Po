const express = require("express");
const userDetails = express();
const userDetailsModel = require("../models/userDetailsModel");

userDetails.post("/EditUserDetails", async (req, res) => {
    const { address, GSTIN, CIN, logo, PAN } = req.body;
    if (address && GSTIN && CIN && logo && PAN) { // Check if all fields are present
        try {
            const userData = await userDetailsModel.create({
                address: address,
                GSTIN: GSTIN,   
                CIN: CIN,
                logo: logo,
                PAN: PAN
            });
            res.status(201).send(userData); // Send the newly created user data
        } catch (e) {
            res.status(500).send("Something went wrong: " + e);
        }
    } else {
        res.status(400).send("All fields are required!");
    }
});

module.exports = userDetails;
