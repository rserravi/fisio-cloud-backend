const {CustomerSchema}= require ("./Customer.schema");

const insertCustomer = customerObj =>{
    return new Promise((resolve,reject)=>{
        try {
            CustomerSchema(customerObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN INSERT CUSTOMER", error)
            reject(error);
        }
    });
}

const getAllCustomers = () =>{
    return new Promise((resolve,reject)=>{
        try {
            CustomerSchema
            .find()           
            .then((data)=>{resolve(data)})
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN GET ALL CUSTOMER", error)
            reject(error);
        }
    });
}

const getCustomerById = (_id)=>{
 return new Promise((resolve,reject)=>{
       try {
           CustomerSchema
           .find({_id})
           .then((data)=>resolve(data))
           .catch((error)=> reject(error));
       } catch (error) {
           reject(error);
       }
   });
};

const deleteCustomer = ({_id}) =>{
    return new Promise((resolve,reject)=>{
        try {
            TicketSchema
            .findByIdAndDelete(
                {_id },
            )
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
 };

const getCustomerNameById = (_id)=>{
    return new Promise((resolve,reject)=>{
          try {
              CustomerSchema
              .findOne({_id})
              .then((data)=>{
                    const name = data.firstname + " " + data.lastname;
                    resolve(name)
                })
              .catch((error)=> reject(error));
          } catch (error) {
              reject(error);
          }
      });
   };

const getLastCustomerRecordId = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            CustomerSchema
            .find().sort({ $natural: -1 }).limit(1)
            .then((data)=>{
                  const result = data[0]._id
                  //console.log("LAST CUSTOMER ID", data[0]._id)
                  resolve(result.toString())
              })
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

const getFirstCustomerRecordId = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            CustomerSchema
            .find().sort({ $natural: 1 }).limit(1)
            .then((data)=>{
                  const result = data[0]._id
                  //console.log("FIRST CUSTOME ID", data[0]._id)
                  resolve(result.toString())
              })
            .catch((error)=> reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

const getNextCustomerById =(curId)=>{
    
    return new Promise(async(resolve,reject)=>{
        
        try {
            const last = await getLastCustomerRecordId();
            const first = await getFirstCustomerRecordId();
            //console.log("FIRST, LAST AND CURRENT", first, last, curId)
            if (curId === last){
                resolve(first);
            }else{
            CustomerSchema
            .find({_id:{$gt: curId}}).sort({_id: 1 }).limit(1)
            .then((data)=>{
                  const result = data[0]._id.toString()
                  resolve(result)
              })
            .catch((error)=>{ 
                console.log("ERROR EN GET NEXT CUSTOMER BY ID", error)
                reject(error)});
            }
        } catch (error) {
            console.log("ERROR EN GET NEXT CUSTOMER BY ID", error)
            reject(error);
        }
    });
}

const getPrevCustomerById = (curId)=>{
   
    return new Promise(async(resolve,reject)=>{
        
        try {
            const last = await getLastCustomerRecordId();
            const first = await getFirstCustomerRecordId();
            //console.log("FIRST, LAST AND CURRENT", first, last, curId)
            if (curId === first){
                resolve(last);
            }else{
            CustomerSchema
            .find({_id: {$lt: curId}}).sort({_id: -1 }).limit(1)
            .then((data)=>{
                  const result = data[0]._id.toString()
                  resolve(result)
              })
            .catch((error)=> {
                console.log("ERROR EN GET NEXT CUSTOMER BY ID", error)
                reject(error)});
            }
        } catch (error) {
            console.log("ERROR EN GET PREV CUSTOMER BY ID", error)
            reject(error);
        }
    });
}


module.exports = {
    insertCustomer,
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
    getCustomerNameById,
    getNextCustomerById,
    getPrevCustomerById,
    getLastCustomerRecordId,
    getFirstCustomerRecordId,
 }