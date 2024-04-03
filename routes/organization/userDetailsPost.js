const express = require("express");
const organizationDetailsAdd = express();
const organizationModel = require("../../models/user/organizationModel");
const multer = require("multer");

organizationDetailsAdd.use(express.json());
organizationDetailsAdd.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });

organizationDetailsAdd.post("/create", upload.single('files'), async (req, res) => {
    try {
        const { address, GSTIN, CIN, PAN,createdBy,MDName,HODName,buyerName } = req.body;
        if (!address || !GSTIN || !CIN || !PAN || !createdBy) {
            return res.status(400).send("All fields are required!");
        }

        if (!req.file) {
            return res.status(400).send("File upload is required!");
        }

        const files = req.file.originalname;
        
        const userData = await organizationModel.create({
            address: address,
            GSTIN: GSTIN,
            CIN: CIN,
            logo: files,
            PAN: PAN,
            createdBy:createdBy
        });

        res.status(201).send(userData); // Send the newly created user data
    } catch (e) {
        console.error("Error:", e);
        res.status(500).send("Internal server error!");
    }
});

module.exports = organizationDetailsAdd;
