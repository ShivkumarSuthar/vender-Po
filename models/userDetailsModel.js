const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    address: String,
    GSTIN: String,
    PAN: String,
    CIN: String,
    logo: {
        type: String,
        required: true
    }
});

const UserData = mongoose.model('UserDatails', userDataSchema);

module.exports = UserData;
