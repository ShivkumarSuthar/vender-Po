const express = require('express');
const multer = require('multer');
const PoModel = require("../../models/PO/PO");
const PoItemModel = require("../../models/poItems/PO_item");
const PoItemsDocsModel = require('../../models/poItems/file');

const router = express.Router();
const upload = multer();

// Combined API endpoint for updating PO, PO item, and uploading documents
router.put("/updateAll/:_id",  async (req, res) => {
    const PoEdit_Id = req.params._id;
    const { itemData, poData } = req.body;

    try {
        // Update PO
        const updatedPo = await PoModel.findByIdAndUpdate(PoEdit_Id, poData, { new: true });

        if (!updatedPo) {
            return res.status(404).send("PO not found");
        }

        // Update PO item
        const poItemId = itemData._id;
        delete itemData._id; // Remove _id from itemData object to prevent update attempt
        const updatedItem = await PoItemModel.findOneAndUpdate({ PO_id: PoEdit_Id, _id: poItemId }, itemData, { new: true });

        if (!updatedItem) {
            return res.status(404).send("PO item not found");
        }

        // Upload document
        if (req.file) {
            let existingDoc = await PoItemsDocsModel.findOne({ PO_Id: PoEdit_Id });

            if (existingDoc) {
                existingDoc.files.push(req.file);
                existingDoc = await existingDoc.save();
            } else {
                const poItemDoc = new PoItemsDocsModel({ PO_Id: PoEdit_Id, files: [req.file] });
                existingDoc = await poItemDoc.save();
            }
        }

        res.status(200).send({ po: updatedPo, item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
