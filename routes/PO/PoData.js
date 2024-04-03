const express = require('express');
const PoModel = require("../../models/PO/PO");
const PoGet = express();

PoGet.get("/view/:_id", async (req, res) => {
    try {
        const PoData = await PoModel.findOne({ _id: req.params._id });
        if (PoData) {
            res.status(201).send(PoData );
        }
        else {
            res.send("something went wrong!").status(400)
        }

    } catch (e) {
        res.status(500).send("Internal server Error!"+e);
    }
});
module.exports = PoGet;                   