const mongoose = require("mongoose");
const moment=require("moment")
const userDataSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        default: () => moment().format("DD-MM-YYYY" + " " + "HH:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: "",
    },
    updatedBy: {
        type: String,
        default: ""
    },
    address: {
        type: String,
    },
    GSTIN: {
        type: String,
    },
    PAN: {
        type: String,
    },
    CIN: {
        type: String,
    },
    logo: {
        type: String,
    },
    buyerName:{
        type:String
    },
    HODName:{
   type:String
    },
    MDName:{
        type:String
    }

});

const UserData = mongoose.model("Organization_Details", userDataSchema);

module.exports = UserData;
