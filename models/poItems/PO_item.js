const mongoose = require("mongoose");
const moment = require("moment");

const Po_ItemsSchema = mongoose.Schema({
    created_at: {
        type: String,
        default: () => moment().format('DD-MM-YYYY HH:mm:ss')
    },
    createdBy: {
        type: String,
        default: "user"
    },
    updatedAt: {
        type: String,
        default: "-"
    },
    updatedBy: {
        type: String,
        default: "-"
    },
    item_code: {
        type: String,
    },
    item_name: {
        type: String
    },
    Purchase_qty: {
        type: String,
    },
    Payment_Term: {
        type: String,
    },
    Inco_Term: {
        type: String
    },
    Basic_Price: {
        type: String
    },
    tax: {
        type: String
    },
    amount: {
        type: String
    },
    Delivery_Date: {
        type: String
    },
    PO_id: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Po_items_collection", Po_ItemsSchema);
