const express = require("express");
const venderModel = require("../../models/vender/vender")
const venderAllList = express();

venderAllList.get("/venderList", async (req, res) => {
    try {
        const venderList = await venderModel.find();
        res.status(201).send(venderList);
    }
    catch (e) {
        res.status(500).send("Internal server Error!")
    }
})
module.exports=venderAllList;