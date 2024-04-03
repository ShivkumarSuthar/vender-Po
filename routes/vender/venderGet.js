const express = require('express');
const venderModel = require("../../models/vender/vender")
const venderGet = express();

venderGet.get("/view/:vender_code", async (req, res) => {
    try {
        const venderData = await venderModel.findOne({ Vender_code: req.params.vender_code });
        res.status(201).send(venderData);
    } catch (e) {
        res.status(500).send("Internal server Error!"+e);
    }
});
module.exports=venderGet;                   