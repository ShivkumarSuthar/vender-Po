const express=require("express")
const filesModel=require("../../models/poItems/file")
const docList=express();

docList.post("/FilesList/:PO_Id", async(req,res)=>{
    try{
    const files=await filesModel.find({PO_Id:req.params.PO_Id})


    if(files){
        res.status(200).send(files)
    }
    else{
        res.status(500).send({message:"something went wrong!"})
    }
    }catch(e){
        res.send("internal server error!"+e).status(500)
    }
})

module.exports=docList