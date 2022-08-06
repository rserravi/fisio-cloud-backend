const moment = require("moment");


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

  module.exports = fillData;