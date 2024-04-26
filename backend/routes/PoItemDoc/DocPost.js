const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const moment = require('moment');
const PoItemsDocs = require('../../models/poItems/file');

const fileUploads = express();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('YYYY-MM-DD-HH-mm-ss') + '-' + file.originalname); // Use timestamp to avoid filename conflicts
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });

fileUploads.post('/addFiles', upload.array('files', 5), async (req, res) => {
    const { PO_Id } = req.body;
    try {
        const files = req.files.map(file => file.originalname); // Extracting original names only
        const poItemsDocs = new PoItemsDocs({ files: files, PO_Id: PO_Id });
        await poItemsDocs.save();
        res.status(200).send("Files uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading files");
    }
});


module.exports = fileUploads;
