const express = require("express");
const { insertCabin, getCabins, deleteCabins } = require("../model/cabins/Cabins.model")

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from history router"});
   next();
});

router.post("/", async (req, res)=>{
    console.log(req.body)
    const {
        cabinName,
        description
    } = req.body;
    try {
        const newCabinObj = {
            cabinName,
            description
        }
        console.log("NEW CABIN OBJ", newCabinObj);
        const result = await insertCabin(newCabinObj);
        console.log("RESULT",result);
        res.json({message: "New Cabin Created", result})
    } catch (err) {
        res.json({message: "Error en insterCabin or cabin.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {_id} = req.body;
    try {
        const result = await getCabins(_id);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {_id} = req.body;
    console.log("ESTO ES EL BODY",req.body)
    try {
        const result = await deleteCabins(_id);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

module.exports = router;