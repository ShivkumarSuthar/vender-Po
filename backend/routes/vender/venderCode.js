const express = require("express");
const venderModel = require("../../models/vender/vender")
const venderCode = express()

venderCode.get("/venderData/:venderCode", async (req, res) => {
    try {
        const venderData = await venderModel.findOne({ Vender_code: req.params.venderCode })
    res.status(201).send(venderData );
    } catch (e) {
        res.status(500).send("Internal Server Error!")
    }
})
module.exports= venderCode;