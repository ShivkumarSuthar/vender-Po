const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors')
const app=express();
const user=require('./routes/user')
const venderPost=require("./routes/vendorPost")
const vendorGet=require("./routes/vendorGet")
const vendorList=require("./routes/vendorGetAll")
const VendorEdit =require("./routes/VendorEdit")
const userDetails =require("./routes/userDetailsPost")
const getUserDetails =require("./routes/userDetailsGet")
//creating middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user",user)
app.use("/vendor", venderPost)
app.use("/vendor", vendorGet)
app.use("/vendor", vendorList)
app.use("/vendor", VendorEdit)
app.use("/user", userDetails)
app.use("/user", getUserDetails)
//making connection to db
mongoose.connect("mongodb://localhost:27017/task");

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Running server on the PORT ${PORT}`))

