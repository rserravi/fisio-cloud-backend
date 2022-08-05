const {SetupAlertsSchema}= require ("./SetupAlerts.schema") 

const insertAlertSetup = setupAlertObj =>{
    return new Promise((resolve,reject)=>{
        try {
            SetupAlertsSchema(setupAlertObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=>{console.log("ERROR EN insertAlertSetup", error); reject(error)});
        } catch (error) {
            console.log("ERROR EN insertAlertSetup", error)
            reject(error);
        }
    });
}

const getAlertsSetup = (userId) =>{
    var filter={}
    if (userId){
        filter ={"userId":userId} 
        return new Promise((resolve,reject)=>{
            try{
                SetupAlertsSchema.findOne(filter, (error, data)=>{
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
    } else {
        return new Promise((resolve,reject)=>{
            try{
                SetupAlertsSchema.find((error, data)=>{
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
}

const updateAlertsSetup = (frmData) =>{
    const userId= frmData.alerts.userId;
    console.log("frmData", frmData)
    
    return new Promise((resolve,reject)=>{
        try {
            SetupAlertsSchema.findOneAndUpdate(
                {"userId":userId},
                {$set: frmData.alerts},
                {new: true}, 
                (error, data) =>{
                    if(error){
                        console.log("ERROR", error)
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

const deleteAlertsSetup = (userId) =>{
    console.log("USERID EN DELETE SERVICES",userId)
    return new Promise((resolve,reject)=>{
        try {
            SetupAlertsSchema
            .findOneAndDelete(
                {userId}
            )
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    insertAlertSetup,
    getAlertsSetup,
    updateAlertsSetup,
    deleteAlertsSetup
 }
 