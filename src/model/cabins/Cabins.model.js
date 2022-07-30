const {CabinsSchema}= require ("./Cabins.schema") 

const insertCabin = cabinObj =>{
    return new Promise((resolve,reject)=>{
        try {
            CabinsSchema(cabinObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=>{console.log("ERROR EN INSERT CABIN", error); reject(error)});
        } catch (error) {
            console.log("ERROR EN INSERT CABIN", error)
            reject(error);
        }
    });
}

const getCabins = (_id) =>{
    var filter={}
    if (_id){
        filter ={"_id":_id} 
        return new Promise((resolve,reject)=>{
            var result = [];
            try{
                CabinsSchema.findOne(filter, (error, data)=>{
                if(error){
                    console.log(error)
                    reject(error);
                }else{
                    resolve(data);
                }
            }
            ).clone();
            } catch (error) {
                reject(error);
            }
        });
    } else {
        return new Promise((resolve,reject)=>{
            try{
                CabinsSchema.find((error, data)=>{
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

const updateCabins= (frmData) =>{
    const _id= frmData._id;
    
    return new Promise((resolve,reject)=>{
        try {
            CabinsSchema.findOneAndUpdate(
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

const deleteCabins = (_id) =>{
    console.log("ID EN DELETE CabinS",_id)
    return new Promise((resolve,reject)=>{
        try {
            CabinsSchema
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

const getCabinsNameById = (_id) =>{
    var filter={}
    if (_id){
        filter ={"_id":_id} 
        return new Promise((resolve,reject)=>{
            var result = [];
            try{
                CabinsSchema.findOne(filter, (error, data)=>{
                if(error){
                    console.log(error)
                    resolve("NOT FOUND")
                    reject(error);
                }else{
                    resolve(data.cabinName);
                }
            }
            ).clone();
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = {
    insertCabin,
    getCabins,
    updateCabins,
    deleteCabins,
    getCabinsNameById
 }
 