const express = require("express")
const venderData = require("../models/vendor")
const venderPost = express();

venderPost.use(express.json());
venderPost.use(express.urlencoded({ extended: true }));
venderPost.post("/addVendor", (req, res) => {
    try {
        const { name, address, Vendor_Classification, Customer_Currency, Contact_Person_Name, Contact_Person_Phone_No, Contact_Person_Email, Vendor_Type, GSTN_Number, Pan_Number, Ecc_No, St_Reg_Number, Tin_No, Tan_Number, Payment_Terms, Inco_Terms, Bank_ACC_No, Bank_Branch, Bank_IFSC, Bank_Name, MSME_No, status } = req.body;
        
        const vendor = venderData.create({
            Name: name,
            Address: address,
            Vendor_Classification: Vendor_Classification,
            Customer_Currency: Customer_Currency,
            Contact_Person_Name: Contact_Person_Name,
            Contact_Person_Phone_No: Contact_Person_Phone_No,
            Contact_Person_Email: Contact_Person_Email,
            Vendor_Type: Vendor_Type,
            GSTN_Number: GSTN_Number,
            Pan_Number: Pan_Number,
            Tin_No: Tin_No,
            Ecc_No: Ecc_No,
            St_Reg_Number: St_Reg_Number,
            Tan_Number: Tan_Number,
            MSME_No: MSME_No,
            Payment_Terms: Payment_Terms,
            Inco_Terms: Inco_Terms,
            Bank_ACC_No: Bank_ACC_No,
            Bank_Branch: Bank_Branch,
            Bank_IFSC: Bank_IFSC,
            Bank_Name: Bank_Name,
            status: status
        });
        res.status(201).send("successfully created")
    }
    catch (e) {
        throw e
    }
})
module.exports = venderPost;