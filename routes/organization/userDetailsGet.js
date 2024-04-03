const express = require("express");
const organizationDetails = express();
const organizationModel = require("../../models/user/organizationModel");

organizationDetails.post("/details", async (req, res) => {
   
        try {
            const organizationData = await organizationModel.find();
            if(organizationData){
                res.status(201).send( organizationData);
            }
            else{
                res.status(401).send({message:"Something went Wront"}); // Send the newly created user data
            }
        } catch (e) {
            res.status(500).send("Internal server Error" + e);
        }
    
});

module.exports = organizationDetails;
