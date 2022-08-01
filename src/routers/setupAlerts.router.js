const express = require("express");
const { insertAlertSetup, getAlertsSetup, updateAlertsSetup } = require("../model/setupalerts/SetupAlerts.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from history router"});
   next();
});

router.post("/", async (req, res)=>{
    console.log("REQUEST BODY",req.body)
    const {
        userId,
        showAppoAlerts,
        showCommAlerts,
        showPast,
        showComming,
        pastDaysPeriod,
        commingDaysPeriod

    } = req.body;
    try {
        const newAlertSetup = {
            userId,
            showAppoAlerts,
            showCommAlerts,
            showPast,
            showComming,
            pastDaysPeriod,
            commingDaysPeriod
        }
        console.log("NEW SERVICE OBJ", newAlertSetup);
        const result = await insertAlertSetup(newAlertSetup);
        console.log("RESULT",result);
        res.json({message: "New Alert Setup Created", result})
    } catch (err) {
        res.json({message: "Error en insertAlertSetup or setupAlerts.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {userId} = req.query
    try {
        const result = await getAlertsSetup(userId);
        console.log(result)
        return res.json({status:"success", result});
  
    } catch (error) {
        console.log(error)
        res.json({status:"error", message:error.message});
    }  
})

router.put("/", async (req, res)=>{
    console.log("DATOS RECIBIDOS EN PUT", req.body)
    try {
        const result = await updateAlertsSetup(req.body);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {userId} = req.body;
    console.log("ESTO ES EL BODY",req.body)
    try {
        const result = await deleteAlertSetup(userId);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

module.exports = router;