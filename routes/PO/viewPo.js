const express = require('express');
const router = express.Router();
const organizationModel = require("../../models/user/organizationModel");
const poItemModel = require("../../models/poItems/PO_item");
const PoModel = require("../../models/PO/PO");
const venderModel = require("../../models/vender/vender");

router.post("/Po_combined", async (req, res) => {
    try {
        const { PO_ID } = req.body;

        const organizationData = await organizationModel.find();
        const PoData = await PoModel.findOne({ _id: PO_ID });
        const PoItemData = await poItemModel.find({ PO_id: PO_ID });
        const venderData = await venderModel.findOne({ Vender_code: PoData.vender_code });

        res.status(200).json({
            organizationData: organizationData,
            PoData: PoData,
            PoItemData: PoItemData,
            venderData: venderData
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
