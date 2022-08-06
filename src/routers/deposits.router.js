const express = require("express");
const { getDepositsByDate } = require("../model/deposits/Deposits.model");

const router = express.Router({ mergeParams: true });
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from history router"});
   next();
});

//USAR "QUERY".
router.get("/", async (req, res)=>{
    const fromDate = new Date(req.query.from);
    const endDate = new Date(req.query.end);
    const userId = req.query.userId;
    console.log("EN ROUTER GET", req.query)
    try {
        const result = await getDepositsByDate(fromDate, endDate, userId);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})

 
module.exports = router;


