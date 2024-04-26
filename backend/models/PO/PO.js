const Po = require("mongoose");
const moment = require("moment");

const PoData = Po.Schema({
    Po_no: {
        type: String,
    },

    DOC: {
        type: String,
    },

    Material_delivery_address: {
        type: String,
    },

    vender_code: {
        type: String
    },
    vender_name: {
        type: String
    },

    remark: {
        type: String,
    },

    insurance: {
        type: String,
    },

    insurance_tax: {
        type: String,
    },

    packing_Formawading: {
        type: String,
    },

    packing_tax: {
        type: String,
    },

    fright_or_trasnportation: {
        type: String,
    },

    trasnportation_tax: {
        type: String,
    },

    other_charges: {
        type: String,
    },

    others_tax: {
        type: String,
    },

    buyyer_status: {
        type: Boolean,
        default: false
    },

    buyyer_status_update_at: {
        type: String,
        default: "-"
    },

    HOD_status: {
        type: Boolean,
        default: false
    },

    HOD_status_update_at: {
        type: String,
        default: "-"
    },

    MD_status: {
        type: Boolean,
        default: false
    },

    MD_status_update_at: {
        type: String,
        default: "-"
    },

    PO_status: {
        type: String,
        default: "-"

    },

    term_Condition: {
        type: String,
    },

    Final_Approved_at: {
        type: String,
        default: "-"
    },

    created_at: {
        type: String,
        default: () => moment().format('DD-MM-YYYY' + " " + 'HH:mm:ss')
    },
    createdBy: {
        type: String,
    },
    Updated_at: {
        type: String,
        default: "-"
    },
    Updated_by: {
        type: String,
        default: "-"
    },
    UppdatedByHOD:{
        type:String
    },
    UppdatedBybuyer:{
        type:String
    }
    ,UppdatedByMD:{
        type:String
    }
});

module.exports = Po.model("Purchase_Orders_Collection", PoData);
