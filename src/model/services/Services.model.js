const {ServicesSchema}= require ("./Services.schema") 

const insertService = serviceObj =>{
    return new Promise((resolve,reject)=>{
        try {
            ServicesSchema(serviceObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=>{console.log("ERROR EN INSERTSERVICE", error); reject(error)});
        } catch (error) {
            console.log("ERROR EN INSERT SERVICE", error)
            reject(error);
        }
    });
}

const getServices = (_id) =>{
    var filter={}
    if (_id){
        filter ={"_id":_id} 
        return new Promise((resolve,reject)=>{
            try{
                ServicesSchema.findOne(filter, (error, data)=>{
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
                ServicesSchema.find((error, data)=>{
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

const updateServices= (frmData) =>{
    const _id= frmData._id;
    
    return new Promise((resolve,reject)=>{
        try {
            ServicesSchema.findOneAndUpdate(
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

const deleteServices = (_id) =>{
    console.log("ID EN DELETE SERVICES",_id)
    return new Promise((resolve,reject)=>{
        try {
            ServicesSchema
            .findByIdAndDelete(
                {_id}
            )
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

const getServiceNameById = (_id) =>{
    var filter={}

    filter ={"_id":_id} 
    return new Promise((resolve,reject)=>{
        try{
            ServicesSchema.findOne(filter, (error, data)=>{
                
            if(error){
                console.log(error)
                resolve("NOT FOUND")
                reject(error);
            }
            else{
                resolve(data.serviceName);
            }
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    insertService,
    getServices,
    updateServices,
    deleteServices,
    getServiceNameById,
 }
 