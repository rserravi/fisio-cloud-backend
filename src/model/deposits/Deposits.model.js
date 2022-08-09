const {HistorySchema}= require ("../history/History.schema") 
const { getServiceNameById } = require("../services/Services.model")
const { getCustomerNameById } = require("../customer/Customer.model");


const getDepositsByDate= (fromDate, toDate, userId) =>{
    //console.log ("DATOS EN GETDEPOSITSBYDATE", fromDate, toDate, userId)
    var filter = {}
    if (fromDate && !toDate){
        // GETDEBTS FROM
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(fromDate),
                $lte: new Date()
            }
        }
    }
    if (!fromDate && toDate){
        //GET DEBTS TO
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(2010-1-1),
                $lte: new Date(toDate)
            }
        }
    }
    if (fromDate && toDate){
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            }
        }
    }
    
    //console.log(filter)
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find(filter, async (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            //console.log("DATA EN FIND HISTORY", data)
            var deposits = [];
            var item = {};
            var accumulatedDebts = 0;
            var accumulatedGains = 0;
            for (key in data){
                item = {}
                item["id"]= data[key]._id.toString();
                item["income"]= data[key].paid;
                item["debts"]= data[key].price - data[key].paid;
                item["customerName"]= await getCustomerNameById(data[key].customerId)
                item["date"]= data[key].date?data[key].date:new Date()
                item["price"]= data[key].price;
                item["service"]= await getServiceNameById(data[key].service);
                item["duration"]= data[key].duration?data[key].duration:0;
                item["closed"]= data[key].closed;
                deposits.push(item)
                accumulatedGains += data[key].paid;
                accumulatedDebts += data[key].price - data[key].paid;

            }
            const result = {deposits,"income": accumulatedGains, "debts": accumulatedDebts}
            resolve(result);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

const getIncomeAmountByDate= (fromDate, toDate, userId) =>{
    console.log ("DATOS EN GETDEPOSITSBYDATE", fromDate, toDate, userId)
    var filter = {}
    if (fromDate && !toDate){
        // GETDEBTS FROM
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(fromDate),
                $lte: new Date()
            }
        }
    }
    if (!fromDate && toDate){
        //GET DEBTS TO
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(2010-1-1),
                $lte: new Date(toDate)
            }
        }
    }
    if (fromDate && toDate){
        filter = {
            "userId":userId,
            "date":{
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            }
        }
    }
    
    //console.log(filter)
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find(filter, async (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            var accumulatedGains =0;
            //console.log("DATA EN FIND HISTORY", data)
            var item = {};
            for (key in data){
               accumulatedGains+= data[key].paid;

            }
            resolve(jsonObj);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    getDepositsByDate
 }
 