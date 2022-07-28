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

const updateAppointment = (frmData) =>{
    const _id= frmData._id;
    
    return new Promise((resolve,reject)=>{
        try {
            AppoSchema.findOneAndUpdate(
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

const deleteAppointment = (_id) =>{
    
    return new Promise((resolve,reject)=>{
        try {
            AppoSchema
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
    
    console.log(filter)
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
 