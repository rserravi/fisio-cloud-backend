const express = require("express");
const { insertCommunication, getCommunications, getThreadByCommId } = require("../model/communications/Communications.model");

const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from Communications router"});
   next();
});

router.post("/", async (req, res)=>{
    const {
        userId,
        customerId,
        customerSent,
        date,
        type,
        duration,
        subject,
        notes,
        follow,
        alertfollow,
        thread,
        readed,
        answered
    } = req.body;
    try {
        const newCommObj = {
            userId,
            customerId,
            customerSent,
            date: new Date(date),
            type,
            duration: Number(duration),
            subject,
            notes,
            follow,
            alertfollow: new Date(alertfollow),
            thread,
            readed,
            answered
        }
        //console.log("NEW COMM OBJ", newCommObj);
        const result = await insertCommunication(newCommObj);
        //console.log("RESULT",result);
        res.json({message: "New Comm Created", result})
    } catch (err) {
        res.json({message: "Error en insertCommunication or Communication.router", err})  
        }
})

//USAR "QUERY".
router.get("/", async (req, res)=>{
    const _id = req.query._id;
    const userId = req.query.userId
    const customerId = req.query.customerId;
    try {
        const result = await getCommunications(_id, userId, customerId);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

//USAR "QUERY".
router.get("/thread", async (req, res)=>{
    const threadNumber = req.query.threadNumber;
    const commId = req.query.commId;

    if (threadNumber && !commId){
        //console.log("ESTAMOS EN THREAD")
        try {
            const result = await getThread(threadNumber);
            return res.json({status:"success", result});
      
        } catch (error) {
            res.json({status:"error", message:error.message});
        }  
    }

    if (commId){
        //console.log("ESTAMOS EN GET THREAD BY COMMIN ROUTER")
        try {
            const result = await getThreadByCommId(commId);
            return res.json({status:"success", result});
      
        } catch (error) {
            res.json({status:"error", message:error.message});
        }  
    }

    
})

 
module.exports = router;
