const express = require("express");
const { insertAppointment, getAppointment, updateAppointment, deleteAppointment, getAppointmentByDate, updateAppointmentData, updateAppointmentPaid } = require("../model/appointments/Appointments.model");
const { insertHistory } = require("../model/history/History.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Appointment router"});
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
        const result = await insertAppointment(newAppoObj);
        res.json({message: "New Appointment Created", result})
    } catch (err) {
        res.json({message: "Error en insertAppointment or Appointment.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {_id, userId, customerId} = req.query;
    try {
        const result= await getAppointment(_id, userId, customerId);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.put("/", async (req, res)=>{
    const frmData = req.body;
    try {
        const result = await updateAppointment(frmData.body);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.put("/date", async (req, res)=>{
    const {appoId, newDate} = req.body;
    try {
        const result = await updateAppointmentData(appoId, newDateº);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.put("/paid", async (req, res)=>{
    const {appoId, amountPaid} = req.body;
    try {
        const result = await updateAppointmentPaid(appoId, amountPaid);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {_id} = req.query;
    console.log("QUERY EN DELETE",req.query)
    try {
        const result = await deleteAppointment(_id);
        return res.json({status:"success", message:"Appointment Deleted", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/close", async (req, res)=>{
    const {_id} = req.query;
    console.log("QUERY EN DELETE",req.query)
    try {
        const oldappo= await getAppointment(_id);
        //console.log("OLDAPPO", oldappo[0])
        const newHistoObj = {
            userId : oldappo[0].userId,
            customerId: oldappo[0].customerId,
            date: oldappo[0].date,
            duration: oldappo[0].duration,
            service: oldappo[0].service,
            cabin: oldappo[0].cabin,
            price: oldappo[0].price,
            paid: oldappo[0].paid,
            status: oldappo[0].status,
            closed: new Date(),
            notes: oldappo[0].notes,
            attachment: oldappo[0].attachment

        }
        //console.log("NEW HISTOOBJ,",newHistoObj)
        const result = await insertHistory(newHistoObj);
        const del = await deleteAppointment(_id);
        return res.json({status:"success", message:"Appointment moved to history", result, del});
  
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


