const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PoModel = require("../../models/PO/PO");
const PoItemModel = require("../../models/poItems/PO_item");
const PoItemsDocsModel = require('../../models/poItems/file');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for file uploads

// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Combined API endpoint for updating PO, PO item, and uploading documents
router.put("/updateAll/:_id", upload.array('file'), async (req, res) => {
    const PoEdit_Id = req.params._id;
    const { poData, itemData } = req.body;
  
    try {
        // Update PO
        const updatedPo = await PoModel.findByIdAndUpdate(PoEdit_Id, JSON.parse(poData), { new: true });

        if (!updatedPo) {
            return res.status(404).send("PO not found");
        }

        // Update PO items if itemDatas is provided
const itemDatas=JSON.parse(itemData)
        if (itemDatas && Array.isArray(itemDatas)) {
            for (const item of itemDatas) {
                const { _id, ...updateditemDatas } = item; // Remove _id field from itemDatas object
                const updatedItem = await PoItemModel.findOneAndUpdate({ PO_id: PoEdit_Id, _id }, updateditemDatas, { new: true });

                if (!updatedItem) {
                    return res.status(404).send("PO item not found");
                }
            }
        }

        // Update files only
        let existingDoc = await PoItemsDocsModel.findOne({ PO_Id: PoEdit_Id });

        if (existingDoc) {
            // Update existing document with uploaded files
            existingDoc.files = req.files.map(file => ({
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                size: file.size,
                destination: file.destination,
                filename: file.filename,
                path: file.path
            }));
            existingDoc = await existingDoc.save();
        } else {
            // Create a new document with uploaded files
            const poItemDoc = new PoItemsDocsModel({ PO_Id: PoEdit_Id, files: req.files.map(file => ({
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                size: file.size,
                destination: file.destination,
                filename: file.filename,
                path: file.path
            })) });
            existingDoc = await poItemDoc.save();
        }

        // Send back all updated data
        res.status(200).json({
            updatedPo,
            updatedItems: itemDatas,
            uploadedFiles: req.files
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// GET route to view files
router.get('/view/:filename', async (req, res) => {
    const { filename } = req.params;
    try {
        const filePath = path.join('uploads', filename);
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
