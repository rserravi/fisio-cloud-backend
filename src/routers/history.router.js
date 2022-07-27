const express = require("express");
const { insertHistory, getHistory, updateHistory, deleteHistory, getHistoryByDate } = require("../model/history/History.model");


const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from history router"});
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
        const newHistoObj = {
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
        console.log("NEW HISTO OBJ", newHistoObj);
        const result = await insertHistory(newHistoObj);
        console.log("RESULT",result);
        res.json({message: "New History Created", result})
    } catch (err) {
        res.json({message: "Error en insertHistory or history.router", err})  
        }
})

router.get("/", async (req, res)=>{
    const {_id, userId, customerId} = req.body;
    try {
        const result = await getHistory(_id, userId, customerId);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.put("/", async (req, res)=>{
    const frmData = req.body;
    console.log("EN ROUTER",frmData)
    try {
        const result = await updateHistory(frmData);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

router.delete("/", async (req, res)=>{
    const {_id} = req.body;
    console.log("EN ROUTER",_id)
    try {
        const result = await deleteHistory(_id);
        return res.json({status:"success", message:"History Deleted"});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})


router.get("/deposits", async (req, res)=>{
    const {fromDate, toDate, userId } = req.body;
    try {
        const result = await getHistoryByDate(fromDate, toDate, userId);
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


 
module.exports = router;


