const { HistorySchema }= require ("../history/History.schema");
const moment = require("moment");
var _ = require('underscore');
const { getCabins } = require("../cabins/Cabins.model");
const { getServicesByCabin, getServicesRealized, getServicesByUser } = require("../history/History.model");
const { getServices } = require("../services/Services.model");
const { getAllUsers } = require("../user/User.model");
const nameInitial = require("../../utils/nameUtils");

const GetArrayOfMonthAndYear = (monthandyear, data) =>{
  let found = {}
  try {
      for (const [key, value] of Object.entries(data)){
        if (key === monthandyear){
          found = value
        }
      }
  } catch (error) {
    console.log(error)
  }
    
  return found;
  
  }

const fillData = (data, locale)=>{
    var jsonObj = []
    const firstDay = Object.values(data)[0][0].date;
    var actualDay = new Date(firstDay)
    while (actualDay<=new Date()){
      const actualMonth = new Date(actualDay).toLocaleDateString(locale, { month: 'short' });
      const actualYear = new Date(actualDay). getUTCFullYear();
      const monthandyear = actualMonth + " " + actualYear;
      jsonObj[monthandyear] = GetArrayOfMonthAndYear(monthandyear, data);
      var newDate = moment(actualDay).add(1, 'months').toISOString();
      actualDay = new Date(newDate);
    }
    return jsonObj;
  }

// GET HISTORY GIVES BACK HISTORY BY _id, customerId, userId, or userId+customerId
const getDepositsArrayForChart = (locale) =>{
    return new Promise((resolve,reject)=>{
        try {
            HistorySchema
            .find()           
            .then((data)=>{
                var unsortedDataJson=[];
                var counter = 0;
                for (let key in data){   
                       var item = {};
                       item["id"]= counter
                       item["histoId"] = data[key].id
                       item["date"] =  data[key].date;
                       item["duration"] = data[key].duration;
                       item["service"] =  data[key].service;
                       item["price"] =data[key].price;
                       item["paid"] =data[key].paid;
                       item["status"] = data[key].status;
                       item["closed"] = data[key].closed;
                       item["notes"] = data[key].notes;
                       item["attachment"] = data[key].attachment;
                       item["customerId"] = data[key].customerId;
                       item["monthandyear"] = new Date(data[key].date).toLocaleString(locale, { month: 'short' }) + " " + new Date(data[key].date).getFullYear();
                       
                       unsortedDataJson.push(item)
                       counter = counter +1;           
                 }
                 const sortedDataJson = _.sortBy(unsortedDataJson,'date')
                 //console.log("DATA ORDENADA", sortedDataJson)
                 const groupedData = _.groupBy(sortedDataJson, "monthandyear" )
                 const filledData = fillData(groupedData, locale);
                 const jsonObj = [];

                 var income = 0;
                 var loses = 0;
                 var date = "";
                 for (const [key, value] of Object.entries(filledData)){
                   income = 0;
                   loses = 0;
                   var item={}
                   item["name"]= key;
                   for (let iter in value){
                     income += Number(value[iter].paid);
                     loses += Number(value[iter].price) - Number(value[iter].paid)
                     date = value[iter].date;
                   }
                   item["earnings"]= income;
                   item["debts"]=loses;
                   item["date"]= date;
                   jsonObj.push(item)

                }
                resolve(jsonObj)
            })
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN GET ALL DEPOSITS", error)
            reject(error);
        }
    });
}

const GetCabinsForChart = ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            var jsonObj=[];
            const cabins = await getCabins();
            console.log ("CABINS EN GET CABINS", cabins)
            for (let key in cabins){
                const cabinId = cabins[key]._id.toString()
                const services = await getServicesByCabin(cabinId);
                const cabinName = cabins[key].cabinName;
                var item = {};
                item["id"]=cabinId;
                item["realized"] = services;
                item["cabinName"] =  cabinName;
                jsonObj.push(item)
                }
            resolve(jsonObj)
    
        } catch (error) {
            console.log("ERROR EN GET CABINS FOR CHART", error)
            reject(error);
        }
    });

}
const GetServicesForChart=()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            var jsonObj=[];
            const services = await getServices();
            console.log ("SERVICES EN GET SERVICES", services)
            for (let key in services){
                const serviceId = services[key]._id.toString();
                const realized = await getServicesRealized(serviceId);
                const serviceName = services[key].serviceName;
                var item = {};
                item["id"]=serviceId;
                item["realized"] = realized;
                item["service"] =  serviceName;
                jsonObj.push(item)
             }
            resolve(jsonObj)
    
        } catch (error) {
            console.log("ERROR EN GET SERVICES FOR CHART", error)
            reject(error);
        }
    });
};
const GetServicesRealizedByUsersForChart=()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            var jsonObj=[];
            const users = await getAllUsers();
            for (let key in users){
                var item = {};
                item["id"] = users[key]._id;
                item["name"] = nameInitial(users[key].firstname) + " " +users[key].lastname;
                item["realized"] = await getServicesByUser(users[key]._id.toString());
                jsonObj.push(item);
            
              }
            resolve(jsonObj)
    
        } catch (error) {
            console.log("ERROR EN GET SERVICES FOR CHART", error)
            reject(error);
        }
    });
};
const GetLeadsByDate = ()=>{

};


module.exports = {
    getDepositsArrayForChart,
    GetCabinsForChart,
    GetServicesForChart,
    GetServicesRealizedByUsersForChart,
    GetLeadsByDate,
    fillData
}
 