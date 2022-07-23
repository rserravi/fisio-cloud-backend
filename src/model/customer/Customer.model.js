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

module.exports = {
    insertCustomer
 }
 