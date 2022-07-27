const express = require("express");
const { insertService, getServices, deleteServices } = require("../model/services/Services.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from history router"});
   next();
});

router.post("/", async (req, res)=>{
    const {
        serviceName,
        priceXHour
    } = req.body;
    try {
        const newServiceObj = {
            serviceName,
            priceXHour
        }
        console.log("NEW SERVICE OBJ", newServiceObj);
        const result = await insertService(newServiceObj);
        console.log("RESULT",result);
        res.json({message: "New Service Created", result})
    } catch (err) {
        res.json({message: "Error en insertService or service.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {_id} = req.body;
    try {
        const result = await getServices(_id);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {_id} = req.body;
    console.log("ESTO ES EL BODY",req.body)
    try {
        const result = await deleteServices(_id);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

module.exports = router;