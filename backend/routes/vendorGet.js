const express = require('express');
const vendorModel = require("../models/vendor")
const vendorGet = express();

vendorGet.get("/viewVendor/:Pan_Number", async (req, res) => {
    try {
        const vendorData = await vendorModel.findOne({ Pan_Number: req.params.Pan_Number });
        res.send(vendorData);
    } catch (e) {
        res.status(500).send("Internal server Error!");
    }
});
module.exports=vendorGet;                   