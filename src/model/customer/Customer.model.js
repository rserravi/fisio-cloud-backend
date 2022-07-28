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


module.exports = {
    insertCustomer,
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
 }
 