const { getCustomerById, getCustomerNameById } = require("../customer/Customer.model");
const { getUserNameById } = require("../user/User.model");
const { CommunicationsSchema}= require ("./Communications.schema") 

const insertCommunication = CommObj =>{
    return new Promise((resolve,reject)=>{
        try {
            CommunicationsSchema(CommObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN INSERT Communication", error)
            reject(error);
        }
    });
}

// GET HISTORY GIVES BACK HISTORY BY _id, customerId, userId, or userId+customerId
const getCommunications = (_id, userId, customerId) =>{
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
            CommunicationsSchema.find(filter, async (error, data)=>{
            var result = []
            if(error){
                console.log(error)
                reject(error);
            }else{
                for (key in data){
                    var item = {}
                    item["_id"]= data[key]._id;
                    item["userId"]= data[key].userId,
                    item["userName"] = await getUserNameById(data[key].userId),
                    item["customerId"]=data[key].customerId;
                    item["customerName"]=await getCustomerNameById(data[key].customerId),
                    item["customerSent"]=data[key].customerSent,
                    item["date"]=data[key].date;
                    item["type"]=data[key].type;
                    item["duration"]=data[key].duration;
                    item["subject"]=data[key].subject;
                    item["notes"]=data[key].notes;
                    item["follow"]=data[key].follow;
                    item["alertfollow"]=data[key].alertfollow;
                    item["thread"]=data[key].thread;
                    item["readed"]=data[key].readed;
                    item["answered"]=data[key].answered;
                    
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

// GET HISTORY GIVES BACK HISTORY BY _id, customerId, userId, or userId+customerId
const getThread = (threadNumber) =>{
    var filter={"thread":threadNumber} 

    return new Promise((resolve,reject)=>{
        try{
            CommunicationsSchema.find(filter, async (error, data)=>{
            var result = []
            if(error){
                console.log(error)
                reject(error);
            }else{
                for (key in data){
                    var item = {}
                    item["_id"]= data[key]._id;
                    item["userId"]= data[key].userId,
                    item["userName"] = await getUserNameById(data[key].userId),
                    item["customerId"]=data[key].customerId;
                    item["customerName"]=await getCustomerNameById(data[key].customerId),
                    item["customerSent"]=data[key].customerSent,
                    item["date"]=data[key].date;
                    item["type"]=data[key].type;
                    item["duration"]=data[key].duration;
                    item["subject"]=data[key].subject;
                    item["notes"]=data[key].notes;
                    item["follow"]=data[key].follow;
                    item["alertfollow"]=data[key].alertfollow;
                    item["thread"]=data[key].thread;
                    item["readed"]=data[key].readed;
                    item["answered"]=data[key].answered;
                    
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

const getThreadByCommId = (commId) =>{

    var filter={"_id":commId} 

    return new Promise((resolve,reject)=>{
        
        try{
            CommunicationsSchema.findOne(filter, async (error, data)=>{
            if(error){
                console.log(error)
                reject(error);
            }else{ 
                var filter2 = {"thread":data.thread, "customerId":data.customerId}
                try{
                    CommunicationsSchema.find(filter2, async (error, data)=>{
                    var result = []
                    if(error){
                        console.log(error)
                        reject(error);
                    }else{
                        //console.log("DATA EN SEGUNDA PARTE DE GETTHREADBYID", data )
                        for (key in data){
                            var item = {}
                            item["_id"]= data[key]._id;
                            item["userId"]= data[key].userId,
                            item["userName"] = await getUserNameById(data[key].userId),
                            item["customerId"]=data[key].customerId;
                            item["customerName"]=await getCustomerNameById(data[key].customerId),
                            item["customerSent"]=data[key].customerSent,
                            item["date"]=data[key].date;
                            item["type"]=data[key].type;
                            item["duration"]=data[key].duration;
                            item["subject"]=data[key].subject;
                            item["notes"]=data[key].notes;
                            item["follow"]=data[key].follow;
                            item["alertfollow"]=data[key].alertfollow;
                            item["thread"]=data[key].thread;
                            item["readed"]=data[key].readed;
                            item["answered"]=data[key].answered;
                            
                            result.push(item)
                        }
                    
                        resolve(result);
                    }
                    }
                ).clone();
                } catch (error) {
                    reject(error);
                }
            }
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    insertCommunication,
    getCommunications,
    getThread,
    getThreadByCommId,
 }
 