const { getCabinsNameById } = require("../cabins/Cabins.model");
const { getCustomerNameById } = require("../customer/Customer.model");
const { getServiceNameById } = require("../services/Services.model");
const {HistorySchema}= require ("./History.schema") 

const insertHistory = historyObj =>{
    return new Promise((resolve,reject)=>{
        try {
            HistorySchema(historyObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN INSERT HISTORY", error)
            reject(error);
        }
    });
}

// GET HISTORY GIVES BACK HISTORY BY _id, customerId, userId, or userId+customerId
const getHistory = (_id, userId, customerId) =>{
    var filter={}
    if (_id){
        filter ={"_id":_id} 
    }
    if (customerId && !userId){
        filter={"customerId":customerId}
    }
    if (customerId && userId){
        filter={"customerId":customerId,"userId":userId}
    }
    if (userId && !customerId){
        filter={"userId": userId}
    }
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find(filter, async (error, data)=>{
            var result = []
            if(error){
                console.log("ERROR EN HYSTORYSCHEMA FIND",error)
                reject(error);
            }else{
                console.log("DATOS EN GETHISTORY,",data)
                for (key in data){
                    var item = {}
                    item["_id"]= data[key]._id;
                    item["customerId"]=data[key].customerId;
                    item["customerName"]=await getCustomerNameById(data[key].customerId)
                    item["date"]=data[key].date;
                    item["duration"]=data[key].duration;
                    item["service"]=data[key].service;
                    item["cabin"]=data[key].cabin;
                    item["price"]=data[key].price;
                    item["paid"]=data[key].paid;
                    item["status"]=data[key].status;
                    item["closed"]=data[key].closed;
                    item["notes"]=data[key].notes;
                    item["attachment"]=data[key].attachment;
                    item["serviceName"]= await getServiceNameById(data[key].service);
                    item["cabinName"]=await getCabinsNameById(data[key].cabin);
                    result.push(item)
                }
            
                resolve(result);
            }
            }
        ).clone()
        .catch((error)=>{
            console.log("EERROR EN EL FOR DE HISTORYSCHEMA FIND", error, "CON FILTRO", filter)
        }
        )
        } catch (error) {
            reject("ERROR EN EL FIND",error, "FILTRO", filter);
        }
    });
}

const updateHistory = (frmData) =>{
    const _id= frmData._id;
    
    return new Promise((resolve,reject)=>{
        try {
            HistorySchema.findOneAndUpdate(
                {_id},
                {$set: frmData},
                {new: true}, 
                (error, data) =>{
                    if(error){
                        reject(error);
                    }
                    resolve(data);
                    console.log(data);
                    }
            ).clone();
        } catch (error) {
            reject(error);       
        }
    });
}

const deleteHistory = (_id) =>{
    
    return new Promise((resolve,reject)=>{
        try {
            HistorySchema
            .findByIdAndDelete(
                {_id},
            )
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

const getHistoryByDate= (fromDate, toDate, userId) =>{
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
    
    console.log(filter)
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find(filter, (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            resolve(data);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

const GetCabinFromHistory = (cabin) =>{
    var filter={"cabin":cabin}
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find(filter, (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            resolve(data);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

const getServicesByCabin = (cabin)=>{
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find({"cabin":cabin}, (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            console.log("CABINA", cabin, "SERVICIOS TOTALES", data)
            resolve (data.length);
            }
            
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

const getServicesRealized = (service)=>{
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find({"service":service}, (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            console.log("DATA EN GET SERVICES",data.length)
            resolve (data.length);
            }
            
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}


const getServicesByUser =  (userId)=>{
    console.log("USER ID EN GETSERVBYUSER",userId)
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.find({"userId":userId}, (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }
            resolve (data.length);
            }
            
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    insertHistory,
    getHistory,
    updateHistory,
    deleteHistory,
    getHistoryByDate,
    GetCabinFromHistory,
    getServicesByCabin,
    getServicesRealized,
    getServicesByUser
 }
 