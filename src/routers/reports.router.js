const express = require("express");
const { getDepositsArrayForChart, GetCabinsForChart, GetServicesForChart, GetServicesRealizedByUsersForChart } = require("../model/reports/Reports.model");
const { userAuthorization } = require("../middleware/authorization.middleware");
const { GetLeadsAndCustomersForChart } = require("../model/customer/Customer.model");



const router = express.Router({ mergeParams: true });
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from reports router"});
   next();
});


//USAR "QUERY".
router.get("/", userAuthorization, async (req, res)=>{
    const  locale = req.query.locale;
    try {
        const depositsForChart = await getDepositsArrayForChart(locale);
        const cabinsForChart = await GetCabinsForChart();
        const servicesForChart = await GetServicesForChart();
        const userServices = await GetServicesRealizedByUsersForChart();
        const leadsAndCustomers = await GetLeadsAndCustomersForChart();
        return res.json({status:"success", depo:depositsForChart, cabins:cabinsForChart, services:servicesForChart, userServ: userServices, leadsAndCust: leadsAndCustomers});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }    
})

router.get("/depositsforchart", userAuthorization, async (req, res)=>{
    const  locale = req.query.locale;
    try {
        const result = await getDepositsArrayForChart(locale);
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
})


 
module.exports = router;


