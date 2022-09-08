const express = require("express");
const { getCustomerById, updateConsent } = require("../model/customer/Customer.model");
const documentFillFromBluprintAndCustomer = require("../utils/nameUtils")
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dir = "/docs/blueprints"
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Consent router"});
   next();
});

router.post("/", async (req, res)=>{
    const {userId, customerId, blueprint} = req.body
    const _customer = await getCustomerById(customerId); //All customer data
    //console.log("CUSTOMERDATA", _customer)
    const filename = path.join(path.join(__dirname,"../.."), dir + "/" + blueprint)
    let filedata = ""; //All blueprint before modify

    console.log(filename);
    fs.readFile(filename,'utf8', function(err, data){
        if(err) {
            return res.json({status:"error", message:err});
        }
        else{
            filedata = data.toString()
            const finalDoc = documentFillFromBluprintAndCustomer(filedata, _customer[0])
            updateConsent(customerId,finalDoc).then((data)=>{
                return res.json({status: "success", message:"Consent uploaded"});
            })
           
        }
    })
})

router.get("/", async (req,res)=>{
    const customerId = req.query.customerId
    const _customer = await getCustomerById(customerId); //All customer data
    const consent = _customer[0].releaseForm.file;
    if (consent!==""){
        return res.json({status: "success", result:consent});
    }
    else{
        return res.json({status: "error", result: "No Consent Created"})
    }
})


module.exports = router;