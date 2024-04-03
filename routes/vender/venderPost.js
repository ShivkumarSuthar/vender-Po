const express = require("express");
const venderData = require("../../models/vender/vender");
const venderPost = express();

venderPost.use(express.json());

// Initialize vendor counter from the last vendor code in the database
let vendorCounter = 1;

venderPost.post("/add", async (req, res) => {
  try {
    const {
      name,
      address,
      Vendor_Classification,
      Customer_Currency,
      Contact_Person_Name,
      Contact_Person_Phone_No,
      Contact_Person_Email,
      Vendor_Type,
      GSTN_Number,
      Pan_Number,
      Ecc_No,
      St_Reg_Number,
      Tin_No,
      Tan_Number,
      Payment_Terms,
      Inco_Terms,
      Bank_ACC_No,
      Bank_Branch,
      Bank_IFSC,
      Bank_Name,
      MSME_No,
      status,
      createdBy,
    } = req.body;

    // Function to generate the next vendor code
    const generateVendorCode = async () => {
      const lastVendor = await venderData.findOne({}, {}, { sort: { Vender_code: -1 } });
      let nextVendorCode = "0001"; // Default vendor code if no vendors exist

      if (lastVendor) {
        const lastVendorCode = lastVendor.Vender_code;
        // Extract the numeric part of the last vendor code and increment it
        const lastVendorCodeNumeric = parseInt(lastVendorCode);
        const nextVendorCodeNumeric = lastVendorCodeNumeric + 1;
        // Format the new vendor code
        nextVendorCode = nextVendorCodeNumeric.toString().padStart(4, "0");
      }

      return nextVendorCode;
    };

    const vendor_code = await generateVendorCode();

    // Increment vendor counter
    vendorCounter++;

    // Create the vendor with the generated vendor code
    const vendor = await venderData.create({
      Vender_code: vendor_code,
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
      status: status,
      createdBy: createdBy
    });

    res.status(201).send(vendor);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error" + e);
  }
});

module.exports = venderPost;
