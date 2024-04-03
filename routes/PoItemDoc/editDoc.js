const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PoItemsDocs = require('../../models/poItems/file');

const fileEdit = express();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Upload files route
fileEdit.put('/uploadDocs/:PO_Id', upload.array('files'), async (req, res) => {
    try {
        console.log(req.body)
        const PO_Id = req.params.PO_Id;
        const files = req.files;

        console.log( files)
        // Only upload files if files are provided
        if (files.length > 0 && PO_Id) {
            const existingDoc = await PoItemsDocs.findOne({ PO_Id });

            if (existingDoc) {
                // Update existing document with new files
                existingDoc.files = files;
                await existingDoc.save();
                res.status(200).send("Files updated successfully");
            } else {
                // Create a new document if none exists
                const poItemDoc = new PoItemsDocs({ PO_Id, files });
                await poItemDoc.save();
                res.status(201).send("Files uploaded successfully");
            }
        } else {
            res.status(400).send("No files provided for upload or missing PO_Id");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading files");
    }
});

// Get all documents for a particular PO
fileEdit.get('/getDocs/:PO_Id', async (req, res) => {
    const { PO_Id } = req.params;
    try {
        const poItems = await PoItemsDocs.find({ PO_Id });
        res.status(200).json(poItems);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching documents");
    }
});

// Delete a document
fileEdit.delete('/deleteDoc/:docId', async (req, res) => {
    const { docId } = req.params;
    try {
        await PoItemsDocs.findByIdAndDelete(docId);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting document");
    }
});

module.exports = fileEdit;


// Get all documents for a particular PO
fileEdit.get('/getDocs/:PO_Id', async (req, res) => {
    const { PO_Id } = req.params;
    try {
        const poItems = await PoItemsDocs.find({ PO_Id });
        res.status(200).json(poItems);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching documents");
    }
});

// Delete a document
fileEdit.delete('/deleteDoc/:docId', async (req, res) => {
    const { docId } = req.params;
    try {
        await PoItemsDocs.findByIdAndDelete(docId);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting document");
    }
});

module.exports = fileEdit;
