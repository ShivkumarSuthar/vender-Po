const express = require("express");
const PoModel = require("../../models/PO/PO");
const PoAllList = express();

PoAllList.get("/PoList", async (req, res) => {
    try {
        const PoList = await PoModel.find();
        if(PoList){
            res.status(201).send(PoList);
        }
        else{
            res.status(400).send("internal server Error")
        }
       
    }
    catch (e) {
        res.status(500).send("Internal server Error!"+e)
    }
})
module.exports = PoAllList; 