const express = require("express");
const { insertAppointment, getAppointment, updateAppointment, deleteAppointment, getAppointmentByDate } = require("../model/appointments/Appointments.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Appointment router"});
   console.log("EN APPO ROUTER")
   next();
});

router.post("/", async (req, res)=>{
    const {
        userId,
        customerId,
        date,
        duration,
        service,
        cabin,
        price,
        paid,
        status,
        closed,
        notes
    } = req.body;
    try {
        const newAppoObj = {
            userId,
            customerId,
            date: new Date(date),
            duration: Number(duration),
            service,
            cabin,
            price: Number(price),
            paid: Number(paid),
            status,
            closed: closed?new Date(closed):new Date(),
            notes,
            attachment:[] 
        }
        console.log("NEW APPO OBJ", newAppoObj);
        const result = await insertAppointment(newAppoObj);
        console.log("RESULT",result);
        res.json({message: "New Appointment Created", result})
    } catch (err) {
        res.json({message: "Error en insertAppointment or Appointment.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {_id, userId, customerId} = req.body;
    try {
        const result= await getAppointment(_id, userId, customerId);
        
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.put("/", async (req, res)=>{
    const frmData = req.body;
    console.log("EN ROUTER",frmData)
    try {
        const result = await updateAppointment(frmData);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {_id} = req.body;
    console.log("EN ROUTER",_id)
    try {
        const result = await deleteAppointment(_id);
        return res.json({status:"success", message:"Appointment Deleted"});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})


router.get("/deposits", async (req, res)=>{
    const {fromDate, toDate, userId } = req.body;
    try {
        const result = await getAppointmentByDate(fromDate, toDate, userId);
        var accumulatedDebts=0;
        var accumulatedGains=0;
        for (let histoKey in result){
            accumulatedDebts += (Number(result[histoKey].price) -Number(result[histoKey].paid)) 
            accumulatedGains += (Number(result[histoKey].paid)) 
        }

        return res.json({status:"success", "totalGains":accumulatedGains, "totalDebts":accumulatedDebts, result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.get("/cabins", async (req, res)=>{
    const { cabin } = req.body;
    try {
        const result = await GetCabinFromAppointment(cabin);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})
 
module.exports = router;


