const express = require("express");
const vendorModel = require("../models/vendor")
const venderAllList = express();

venderAllList.get("/vendorList", async (req, res) => {
    try {
        const vendorList = await vendorModel.find();
        res.status(200).send(vendorList)
    }
    catch (e) {
        res.status(500).send("Internal server Error!")
    }
})
module.exports=venderAllList;