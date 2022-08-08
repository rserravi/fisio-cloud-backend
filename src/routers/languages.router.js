const express = require("express");
const { json } = require("express/lib/response");
const { userAuthorization } = require("../middleware/authorization.middleware");
const { getAllLanguages, insertLanguage } = require("../model/lang/Lang.model");

const router = express.Router();
 
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return form user router"});
   next();
});

router.post("/", async(req, res) => {
    const { 
        id,
        name,
        language            
         } = req.body;
    //console.log(req.body)
    try {
        const newLangObj = {
            name,
            language
        }
        const result = await insertLanguage(newLangObj);
        //console.log("RESULT",result);
        res.json({message: "New Lang Created", result})
    } catch (err) {
        res.json({message: "Error en language router or insertLanguage", err})   
    }
})

router.get("/", userAuthorization, async (req,res)=>{
    try {
        const result = await getAllLanguages();
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 
 })

 module.exports = router;