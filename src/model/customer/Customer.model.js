const {CustomerSchema}= require ("./Customer.schema");
var _ = require('underscore');
const fillData  = require("../../utils/dataUtils");


const insertCustomer = customerArray =>{
    return new Promise((resolve,reject)=>{
        try {
            CustomerSchema(customerArray)
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
              .catch((error)=> {
                resolve("NOT FOUND")
                reject(error)
            });
          } catch (error) {
              reject(error);
          }
      });
   };

const getCustomerPhone = (_id)=>{
    return new Promise((resolve,reject)=>{
          try {
              CustomerSchema
              .findOne({_id})
              .then((data)=>{
                    data.phonework?resolve (data.phonework):data.phonehome?resolve(data.phonehome):resolve("");
                })
              .catch((error)=> {
                resolve("NOT FOUND")
                reject(error)
            });
          } catch (error) {
              reject(error);
          }
      });
   };

const getCustomerMail = (_id)=>{
    return new Promise((resolve,reject)=>{
          try {
              CustomerSchema
              .findOne({_id})
              .then((data)=>{
                    data.emailwork?resolve (data.emailwork):data.emailhome?resolve(data.emailhome):resolve("");
                })
              .catch((error)=> {
                resolve("NOT FOUND")
                reject(error)
            });
          } catch (error) {
              reject(error);
          }
      });
   };

const getCustomerWhatsapp = (_id)=>{
    return new Promise((resolve,reject)=>{
          try {
              CustomerSchema
              .findOne({_id})
              .then((data)=>{
                    data.whatsapp?resolve (data.whatsapp):resolve("")
                })
              .catch((error)=> {
                resolve("NOT FOUND")
                reject(error)
            });
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

const GetLeadsAndCustomersForChart = (locale)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            var jsonObj = [];
            var data = await getAllCustomers();
          
            //SORT DATA (USING UNDERSCORE)
            const sortedData=_.sortBy(data,'addedAt')
            const expandedData = (()=>{
              var newData = [];
              for (let key in sortedData){
                var item = {}
                item["custoName"] = sortedData[key].firstname + " " +sortedData[key].lastname;
                item["monthandyear"] = new Date(sortedData[key].addedAt).toLocaleString(locale, { month: 'short' }) + " " + new Date(sortedData[key].addedAt).getFullYear();
                item["date"]=sortedData[key].addedAt;
                item["inbound"]=sortedData[key].inbound;
                item["custoName"]= sortedData[key].firstname + " " + sortedData[key].lastname;
                newData.push(item)
              }
              
              return newData;
            })
          
            const groupedData = _.groupBy(expandedData(), "monthandyear" )
            const filledData = fillData(groupedData, locale);
          
            for (const [key, value] of Object.entries(filledData)){
          
              var item={}
              item["name"]= key;
              const leads = _.filter(value, ((item)=>{return item.inbound==="lead"}))
              item["leads"]= leads.length?leads.length:0
              const custo = _.filter(value, ((item)=>{return item.inbound!=="lead"}))
              item["customers"]= custo.length?custo.length:0;
             
              const custoname = (()=>{
                var nameResult = ""
                for (let key in value){
                  if (value[key].inbound!=="lead")
                  nameResult += " - " + value[key].custoName;
                  
                }
                return nameResult; 
              })
              item["custoName"]= custoname()?custoname():"";
              
              const leadname = (()=>{
                var nameResult = ""
                for (let key in value){
                  if (value[key].inbound==="lead")
                  nameResult += " - " + value[key].custoName;
                  
                }
                return nameResult; 
              })
              item["leadName"]= leadname()?leadname():"";
              jsonObj.push(item)
              
            }
            
            resolve(jsonObj);
            
        } catch (error) {
            reject(error);
        }
    });
}

const updateCustomer = (customerId, frmData) =>{
    console.log("UPDATECUSTOMER",customerId, frmData)
    return new Promise((resolve,reject)=>{
        if((!customerId)) return false;
        try{
            CustomerSchema.findOneAndUpdate(
                {_id: customerId},
                {$set:frmData},
                {new: true}, 
                (error, data)=>{
                    if(error){
                        console.log("ERROR EN UPDATECUSTOMER", error)
                        reject(error);
                    }
                    resolve(data);
                    }
        ).clone();
        } catch (error) {
            console.log("ERROR EN UPDATECUSTOMER", error)
            reject(error);
        }
    });
};


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
    getCustomerPhone,
    getCustomerMail,
    getCustomerWhatsapp,
    GetLeadsAndCustomersForChart,
    updateCustomer
 }