const express = require("express");
const { GetCalendar } = require("../model/calendar/Calendar.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Appointment router"});
   console.log("EN CALENDAR ROUTER")
   next();
});


router.get("/", async (req, res)=>{
    const {userId, mode} = req.query;
    try {
        const result= await GetCalendar(userId, mode);
        console.log("RESULT EN GET CALENDAR", result)
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})


 
module.exports = router;


