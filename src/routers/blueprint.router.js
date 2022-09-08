const express = require("express");

const router = express.Router();
const fs = require('fs');
const path = require('path');
const dir = "/docs/blueprints"

 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Blueprint router"});
   next();
});

router.post("/", (req, res)=>{
    res.json({message: "return from Blueprint router POST"});
})


router.get("/", (req, res)=>{
    const _filename = dir + "/"+ req.query.filename;
    var http = require('http');
    var filename = path.join(path.join(__dirname,"../.."), _filename)
    
    if (req.query.filename){
       console.log(filename);
       res.sendFile(filename)
    }

    else{
        try {   
            const newDir = path.join(__dirname,"../..")
            const files = fs.readdirSync(newDir+dir)
            res.json({status:"success", result:files})
            console.log("Estamos en el get General")
        } catch (error) {
            res.json({status:"error", result:error})
        }
    }
}) 

// Update a customer
router.patch("/", async (req,res)=>{
    //console.log(req.query, req.body)
    const _fileName = dir + "/" + req.query.filename;
    const data = req.body.html
    console.log( "FICHERO", _fileName, "DATOS", data)
    const filename = path.join(path.join(__dirname,"../.."), _fileName)
    console.log(filename)
    try {
        fs.writeFile(filename, data, function(err){
            if(err) {
                return res.json({status:"error", message:err});
            }

            return res.json({status:"success", message:"Blueprint Updated"});
        })
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 });


module.exports = router;