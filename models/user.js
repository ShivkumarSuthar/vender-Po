const mongoose = require('mongoose');



//creating schema for categories
const userData = mongoose.Schema({
   userName:String,
   password:String
}


);



//crating model

module.exports = mongoose.model("user", userData)