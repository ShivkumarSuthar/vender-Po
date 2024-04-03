const mongoose = require("mongoose");
const moment=require("moment")
const PoDocs = new mongoose.Schema({
  files: {
    type: Array
  },
  PO_Id: {
    type: String
  },
  uploaded_at: {
    type: String,
    default: () => moment().format('DD-MM-YYYY' + " " + 'HH:mm:ss')
  },

  Updated_at: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("PoItemsDocs", PoDocs);
