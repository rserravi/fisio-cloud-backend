const { getCabinsNameById } = require("../cabins/Cabins.model");
const { getCustomerNameById, getCustomerPhone, getCustomerMail, getCustomerWhatsapp } = require("../customer/Customer.model");
const { getServiceNameById } = require("../services/Services.model");
const { AppoSchema}= require ("./Appointments.schema") 

const insertAppointment = AppointmentObj =>{
    return new Promise((resolve,reject)=>{
        try {
            AppoSchema(AppointmentObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN INSERT Appointment", error)
            reject(error);
        }
    });
}

// GET Appointment GIVES BACK Appointment BY _id, customerId, userId, or userId+customerId
const getAppointment = (_id, userId, customerId) =>{
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
        var result = []
        try{
            AppoSchema.find(filter, async(error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }else{
                //console.log("DATOS EN GETAPPO", data)
                for (key in data){
                    var item = {}
                    item["rowid"]=key;
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
                    item["customerPhone"]= await getCustomerPhone(data[key].customerId);
                    item["customerMail"]= await getCustomerMail(data[key].customerId);
                    item["customerWhatsapp"]= await getCustomerWhatsapp(data[key].customerId);
                    result.push(item)
                }
            
                resolve(result);
            }
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });

}

const updateAppointment = (frmData) =>{
    const _id= frmData._id;
    //console.log("UPDATEAPPOINTMENT", frmData)
    return new Promise((resolve,reject)=>{
        try {
            AppoSchema.findOneAndUpdate(
                {_id: _id},
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

const deleteAppointment = (_id) =>{
    console.log("ID EN DELETEAPPO",_id)
    return new Promise((resolve,reject)=>{
        try {
            AppoSchema
            .findByIdAndDelete(
                {_id:_id},
            )
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

const getAppointmentByDate= (fromDate, toDate, userId) =>{
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
            AppoSchema.find(filter, (error, data)=>{
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

const GetCabinFromAppointment = (cabin) =>{
    var filter={"cabin":cabin}
    return new Promise((resolve,reject)=>{
        try{
            AppoSchema.find(filter, (error, data)=>{
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


module.exports = {
    insertAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentByDate,
    GetCabinFromAppointment
 }
 