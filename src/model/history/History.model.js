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
    console.log(filter)
    return new Promise((resolve,reject)=>{
        try{
            HistorySchema.findOne(filter, (error, data)=>{
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


module.exports = {
    insertHistory,
    getHistory,
    updateHistory,
    deleteHistory,
    getHistoryByDate,
 }
 