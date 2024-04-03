const vendor = require("mongoose");

const vendorData = vendor.Schema({
    //General schema
    Name: {
        type: String,
    },
    Address: {
        type: String,
    },
    Vendor_Classification: {
        type: String,
    },
    Customer_Currency: {
        type: String,
    },
    Contact_Person_Name: {
        type: String,
    },
    Contact_Person_Phone_No: {
        type: String,
    },
    Contact_Person_Email: {
        type: String,
    },
    Vendor_Type: {
        type: String,
    },
    code:{
        type:String,
        default:"0000"
    },
    status:{
type:String,
default:"active"
    },

    //registration schema
    GSTN_Number: {
        type: String,
    },
    Pan_Number: {
        type: String,
    },
    Ecc_No: {
        type: String,
    },
    St_Reg_Number: {
        type: String,
    },
    Tin_No: {
        type: String,
    },
    Tan_Number: {
        type: String,
    },
    MSME_No: {
        type: String,
    },
    //payment schema
    Payment_Terms: {
        type: String,
    },
    Inco_Terms: {
        type: String,
    },

    //bank schema
    Bank_ACC_No: {
        type: String,
    },
    Bank_Branch: {
        type: String,
    },
    Bank_IFSC: {
        type: String,
    },
    Bank_Name: {
        type: String,
    },
});
module.exports = vendor.model("vendor", vendorData)