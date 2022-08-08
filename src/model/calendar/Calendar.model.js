const { AppoSchema }= require ("../appointments/Appointments.schema") 
const { CommunicationsSchema }= require ("../communications/Communications.schema") 
const { CustomerSchema }= require ("../customer/Customer.schema");
const { SetupAlertsSchema } = require ("../setupalerts/SetupAlerts.schema")
const { getCustomerNameById } = require("../customer/Customer.model")
const { getServiceNameById } = require("../services/Services.model")
const timeDifference = require("../../utils/timeUtils");
const addMinutesToDate = require("../../utils/timeUtils");
const moment = require("moment");
const { getLocaleFromUser } = require("../user/User.model");
const { getAlertsSetup } = require("../setupalerts/SetupAlerts.model");

var showAppo=false;
var showAlert=false;
var showBirth=false;

function deepMergeFlatten (obj1, obj2, obj3) {
    var jsonObj=[]
    var indexNumber=0
    for (let key in obj1){
        indexNumber+=1;
        var item={}
        item["id"] = indexNumber;
        item["title"] = obj1[key].title;
        item["allDay"] = obj1[key].allDay;
        item["start"] = obj1[key].start;
        item["end"] = obj1[key].end;
        item["resourceId"] = obj1[key].resourceId;
        item["backgroundColor"]= obj1[key].backgroundColor;
        item["color"] = obj1[key].color;
        item["ispast"] = obj1[key].ispast;
        item["isnext"] = obj1[key].isnext;
        item["customerId"] = obj1[key].customerId;
        item["kind"]= obj1[key].kind;
        item["customerName"]= obj1[key].customerName;
        item["service"]= obj1[key].service;
        item["commAction"]= obj1[key].commAction;
        jsonObj.push(item)
    }
    for (let key in obj2){
        indexNumber+=1;
        var item={}
        item["id"] = indexNumber;
        item["title"] = obj2[key].title;
        item["allDay"] = obj2[key].allDay;
        item["start"] = obj2[key].start;
        item["end"] = obj2[key].end;
        item["resourceId"] = obj2[key].resourceId;
        item["backgroundColor"]= obj2[key].backgroundColor;
        item["color"] = obj2[key].color;
        item["ispast"] = obj2[key].ispast;
        item["isnext"] = obj2[key].isnext;
        item["customerId"] = obj2[key].customerId;
        item["kind"]= obj2[key].kind;
        item["customerName"]= obj2[key].customerName;
        item["service"]= obj2[key].service;
        item["commAction"]= obj2[key].commAction;
        jsonObj.push(item)
    }
    for (let key in obj3){
        indexNumber+=1;
        var item={}
        item["id"] = indexNumber;
        item["title"] = obj3[key].title;
        item["allDay"] = obj3[key].allDay;
        item["start"] = obj3[key].start;
        item["end"] = obj3[key].end;
        item["resourceId"] = obj3[key].resourceId;
        item["backgroundColor"]= obj3[key].backgroundColor;
        item["color"] = obj3[key].color;
        item["ispast"] = obj3[key].ispast;
        item["isnext"] = obj3[key].isnext;
        item["customerId"] = obj3[key].customerId;
        item["kind"]= obj3[key].kind;
        item["customerName"]= obj3[key].customerName;
        item["service"]= obj3[key].service;
        item["commAction"]= obj3[key].commAction;
        jsonObj.push(item)
    }

    return jsonObj;
  }

const GetAppo = (filterAppo, mode)=>{
    const locale = getLocaleFromUser()
    //moment.locale(locale)
    if (showAppo){
        return new Promise((resolve,reject)=>{
            var jsonObj = []
            try{
                AppoSchema.find(filterAppo, async(error, data)=>{
                if(error){
                    console.log(error)
                    reject(error);
                }else{
                    for (key in data){
                        var item = {}

                        var backgroundColor = "dodgerblue";
                        var color = "white";
                        const start = data[key].date
                        const newDate = new Date (start);
                        const end = moment(newDate).add(Number(data[key].duration), 'minutes').toDate();
                        var timeDif = Math.ceil(timeDifference(start) /(1000 * 3600 * 24)); //CONVERT TIMEDIFFERENCE TO DAYS
                        var isPast = false;
                        var isNext = false;
                        if (timeDif <= 0){
                            backgroundColor = "red";
                            color = "white"
                            isPast = true;
                        }
        
                        if (timeDif <=7 && timeDif>=0){
                            backgroundColor = "orange";
                            color = "white"
                            isNext = true;
                        }
        

                        // CONDICIONAL
                        if (mode="seeall" ||mode==="seeallNoBirth" || mode==="alldate" || (mode==="pastdate" && isPast) || (mode==="nextdate" && isNext)){
                   
                           
                            var service = await getServiceNameById(data[key].service);
                            var commAction = "";
                            var allDay = false;
                            var customerName = await getCustomerNameById(data[key].customerId)
                            var resourceId = data[key]._id.toString();
                            var title ="Appointment with "+ customerName + " for " + service;
                            const customerId = data[key].customerId;
        
                            var item = {}
                            item["title"] = title;
                            item["allDay"] = allDay;
                            item["start"] = start;
                            item["end"] = end;
                            item["resourceId"] = resourceId;
                            item["backgroundColor"]= backgroundColor;
                            item["color"] = color;
                            item["ispast"] = isPast;
                            item["isnext"] = isNext;
                            item["customerId"] = customerId;
                            item["kind"]= "appo";
                            item["customerName"]= customerName;
                            item["service"]= service;
                            item["commAction"]= commAction;
                            jsonObj.push(item)
                        }
                        }
                    resolve(jsonObj);
                }
                }
            ).clone();
            } catch (error) {
                reject(error);
            }

        });
    } else return []
}

const getAlerts =(filterAlert, mode)=>{
    if (showAlert){
        return new Promise((resolve,reject)=>{
            var jsonObj = []
            try{
                CommunicationsSchema.find(filterAlert, async(error, data)=>{
                if(error){
                    console.log(error)
                    reject(error);
                }else{
                    for (key in data){
                        if( data[key].follow && data[key].alertfollow)
                        {
                            var backgroundColor = "mediumturquoise";
                            var color = "black";
                            const start = new Date(data[key].alertfollow)
                            const newDate = new Date (start);
                            const end = moment(newDate).add(Number(data[key].duration), 'minutes').toDate();
                            var timeDif = Math.ceil(timeDifference(start) /(1000 * 3600 * 24)); //CONVERT TIMEDIFFERENCE TO DAYS
                            var isPast = false;
                            var isNext = false;
                            if (timeDif <= 0){
                                backgroundColor = "firebrick";
                                color = "white"
                                isPast = true;
                            }
                            if (timeDif <=7 && timeDif >=0){
                                backgroundColor = "tan";
                                color = "white"
                                isNext = true;
                            }
            
                            // CONDICIONAL
                            if (mode="seeall" ||mode==="seeallNoBirth" || mode==="alldate" || (mode==="pastcomm" && isPast) || (mode==="nextcomm" && isNext)){
                                
                                var customerName = await getCustomerNameById(data[key].customerId)
                                var commAction = data[key].follow 
                                var title = commAction + " a " + customerName;
                                var service = "";
                                
                                var allDay = false;
                                
                                var resourceId =data[key]._id;
                                const customerId = data[key].customerId;
                                var item = {}
                                item["title"] = title;
                                item["allDay"] = allDay;
                                item["start"] = start;
                                item["end"] = end;
                                item["resourceId"] = resourceId;
                                item["backgroundColor"]= backgroundColor;
                                item["color"] = color;
                                item["ispast"] = isPast;
                                item["isnext"] = isNext;
                                item["customerId"] = customerId;
                                item["kind"]= "comm";
                                item["customerName"]= customerName;
                                item["service"]= service;
                                item["commAction"]= commAction;
                                jsonObj.push(item)
                            }
                        }
                        }
                    resolve(jsonObj);
                }
                }
            ).clone();
            } catch (error) {
                reject(error);
            }

        });
    }
    else return [];

}

const getBirth = (filterBirth, mode)=>{
    if(showBirth){
        return new Promise((resolve,reject)=>{
            var jsonObj = []
            try{
                CustomerSchema.find(filterBirth, async(error, data)=>{
                if(error){
                    console.log(error)
                    reject(error);
                }else{
                    for (key in data){
                        if(data[key].birthdate)
                        {
                            var backgroundColor = "hotpink";
                            var color = "black";

                            //DATE 
                            const birthdate = data[key].birthdate
                            const actualYear = moment(new Date()).year(); 
                           
                            var start =  moment(birthdate).set('year', actualYear).toDate();
                            var a = moment(start);
                            var b = moment(new Date());
                            var difference = a.diff(b,'days', true)

                            if (difference<0){
                                var start =  moment(birthdate).set('year', actualYear+1).toDate(); 
                            }
                            
                            var isPast = false;
                            var isNext = true;

                            const newDate = start;
                            const end = moment(newDate).add(10, 'minutes').toDate();
                           
                           
                            // CONDICIONAL
                            if (mode="seeall"){
                                
                                var customerName = data[key].firstname + " " + data[key].lastname;
                                var commAction = ""
                                var title = "Birthdate of " + customerName;
                                var service = "";
                                
                                var allDay = true;
                                
                                var resourceId =data[key]._id;
                                const customerId = data[key]._id;
                                var item = {}
                                item["title"] = title;
                                item["allDay"] = allDay;
                                item["start"] = start;
                                item["end"] = end;
                                item["resourceId"] = resourceId.toString()
                                item["backgroundColor"]= backgroundColor;
                                item["color"] = color;
                                item["ispast"] = isPast;
                                item["isnext"] = isNext;
                                item["customerId"] = customerId.toString();
                                item["kind"]= "birth";
                                item["customerName"]= customerName;
                                item["service"]= service;
                                item["commAction"]= commAction;
                                jsonObj.push(item)
                            }
                        }
                        }
                    resolve(jsonObj);
                }
                }
            ).clone();
            } catch (error) {
                reject(error);
            }

        })
    }
}


const GetBellAlerts = async (userId)=>{
    var alertSetup =[]
    try {
        alertSetup = await getAlertsSetup(userId);
    } catch (error) {
        console.log("ERROR EN GETBELLALERTS",error)
    }

    showAppo = alertSetup.showAppoAlerts;
    showAlert = alertSetup.showCommAlerts;
    showBirth = false;

    var today = new Date()
    var lowLimitDate= moment(today).add(-alertSetup.pastDaysPeriod, 'days').toDate();
    today = new Date()
    var highLimitDate = moment(today).add(alertSetup.commingDaysPeriod, 'days').toDate();

    if (!alertSetup.showPast){
        lowLimitDate = new Date()
    }
    if (!alertSetup.showComming){
        highLimitDate = new Date()
    }
    
    const filterAppo = {
            "userId":userId,
            "date":{$lte: highLimitDate,
                    $gte: lowLimitDate}
        }
    const filterAlert={
            "userId":userId,
            "alertfollow":{$lte: highLimitDate,
                    $gte: lowLimitDate},
            $or:[{ readed: false},{answered:false}]
        }
    

    try {
        const appo = await GetAppo(filterAppo, "seeall");
        const comm = await getAlerts(filterAlert, "seeall");
        const birth= [];
        var merged = deepMergeFlatten(appo, comm, birth)
        //merged.forEach((el, index)=> el.id = index+1);
        return merged;
    } catch (error) {
        console.log("ERROR EN FUNCIONES ", error)
    }
   
}

const GetCalendar = async (userId, mode)=>{
    //console.log("EN GET CALENDAR",userId, mode)
    var filterAppo={}
    var filterAlert={}
    var filterBirth={}


    switch (mode) {
        case "pastdate":
          filterAppo={
            "userId":userId,
            "date":{$lte: new Date()}
          }
          filterAlert={}      
          filterBirth={}
          showAppo=true;
          showAlert=false;
          showBirth=false;
          break;
        case "nextdate":
            filterAppo={
              "userId":userId,
              "date":{$gte: new Date()}
            }
            filterAlert={}
            filterBirth={}
            showAppo=true;
            showAlert=false;
            showBirth=false;
            break;
        case "alldate":
            filterAppo={
                "userId":userId,
                }
            filterAlert={}
            filterBirth={}
            showAppo=true;
            showAlert=false;
            showBirth=false;
            break;
        case "notanswered":
            filterAppo={
              }
            filterAlert={
                "userId":userId,
                "answered":false
              }
            filterBirth={}
            showAppo=false;
            showAlert=true;
            showBirth=false;
          break;
        
        case "pastcomm":
            filterAppo={
              }
            filterAlert={
                "userId":userId,
                "date":{$lte: new Date()}
              }
            filterBirth={}
            showAppo=false;
            showAlert=true;
            showBirth=false;
          break;
        case "nextcomm":
            filterAppo={}
            filterAlert={
                "userId":userId,
                "date":{$gte: new Date()}
              }
            filterBirth={}
            showAppo=false;
            showAlert=true;
            showBirth=false;
          break;
        case "allcomm":
            filterAppo={}
            filterAlert={
                "userId":userId,
              }
            filterBirth={}
            showAppo=false;
            showAlert=true;
            showBirth=false;
          break;
        case "seeallNoBirth":
            filterAppo={
                "userId":userId,
              }
            filterAlert={
                "userId":userId,
              }
            filterBirth={}
            showAppo=true;
            showAlert=true;
            showBirth=false;
          break;
          
        case "seeall":
            filterAppo={
                "userId":userId,
              }
            filterAlert={
                "userId":userId,
              }
            filterBirth={}
            showAppo=true;
            showAlert=true;
            showBirth=true;
          break;
      
        default:
            filterAppo={
                "userId":userId,
              }
            filterAlert={
                "userId":userId,
              }
            filterBirth={}
            showAppo=true;
            showAlert=true;
            showBirth=true;
          break;
      }
    
    
    try {
        const appo = await GetAppo(filterAppo, mode);
        const comm = await getAlerts(filterAlert, mode);
        const birth= await getBirth(filterBirth, mode);
        var merged = deepMergeFlatten(appo, comm, birth)
        //merged.forEach((el, index)=> el.id = index+1);
        return merged;
    } catch (error) {
        console.log("ERROR EN FUNCIONES ", error)
    }
   
}

module.exports = {
    GetCalendar,
    GetBellAlerts
 }