const mongoose = require('mongoose');
const moment=require('moment')
const userDataSchema = new mongoose.Schema({
    levels: {
        type: String,
        default: 1
    },
    password: {
        type: String,
    },
    userId: {
        type: String,
    },

    Created_at: {
        type: String,
        default: () => moment().format('DD-MM-YYYY' + " " + 'HH:mm:ss')
    },
    name:{
        type:String,
    },

    Updated_at: {
        type: String,
        default: ""
    },
});

const UserData = mongoose.model('users List', userDataSchema);

module.exports = UserData;
