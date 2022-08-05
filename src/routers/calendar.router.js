const express = require("express");
const { GetCalendar, GetBellAlerts } = require("../model/calendar/Calendar.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Appointment router"});
   next();
});


router.get("/", async (req, res)=>{
    const {userId, mode} = req.query;
    try {
        const result= await GetCalendar(userId, mode);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.get("/alerts", async (req, res)=>{
    const {userId, mode} = req.query;
    try {
        const result= await GetBellAlerts(userId, mode);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})


 
module.exports = router;


