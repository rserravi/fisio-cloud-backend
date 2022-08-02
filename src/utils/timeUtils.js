const moment = require("moment");


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

function toLocalDate2(date, locale) {
  locale(locale);
  console.log (typeof(date));
  const result = new Date(date).toLocaleDateString(locale);
  return result;
}

const timeDifference = (date) => {
  const date1 = new Date (date);
  const elapsedTime = date1 - Date.now();
  return elapsedTime;
   
}

const getDateFromISOTime = (date, locale) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date1 = new Date (date);
  const strDate = date1.toLocaleDateString(locale,options);
  return strDate;
}

const getTimeFromISOTime = (date, locale) =>{
  const date1 = new Date (date);
  const strDate = date1.toLocaleTimeString(locale, {hour12:false, hour: '2-digit', minute: '2-digit' });
  return strDate;
}

const getWeeKDay = (date) =>{
  const date1 = new Date (date);
  return date1.toLocaleDateString();
}

const getWeekInYear = (date) =>{
  const currentdate = new Date(date);
  const oneJan = new Date(currentdate.getFullYear(),0,1);
  const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  const answer = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  return (answer);
}

const getAge = (birthdate) =>{
  var diff_ms = Date.now() - birthdate.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const addMinutesToDate = (date, minutes)=>{
    const newDate = date;
    const returnDate= moment(newDate).add(minutes, 'm').toISOString();
    return returnDate;
}

const addMonthtoDate= (date, months) =>{
  var oldDate = new Date(date)
  var newd = new Date(date)
  newd.setMonth(oldDate.getMonth()+Number(months));
  return newd
}

const addYeartoDate= (date, years) =>{
  var oldDate = new Date(date)
  var newd = new Date(date)
  newd.setFullYear(oldDate.getFullYear()+Number(years));
  return newd
}

const getActualQuarter = (date)=>{
  const year = new Date(date).getFullYear();
  //const QuarterStart1 = new Date (year,1,1);
  const QuarterEnd1 = new Date (year,4,30);
  const QuarterStart2 = new Date (year,4,1);
  const QuarterEnd2 = new Date (year,8,31);
  const QuarterStart3 = new Date (year,9,1);
  //const QuarterEnd3 = new Date (year,12,31);
  if (date <= QuarterEnd1){
    return 1
  }
  if (date >= QuarterStart2 && date <=QuarterEnd2){
    return 2
  }
  if (date >= QuarterStart3){
    return 3
  }
}

const getActualQuarterStartDate = ()=>{
  const today = new Date();
  const quarter = getActualQuarter(today);
  const year = today.getFullYear();
  switch (quarter) {
    case 1:
      return new Date (year,1,1);  
    case 2:
      return new Date (year,4,1);
    case 3:
      return new Date (year,9,1);
    default:
      return new Date();
  }
}

const getActualQuarterEndDate = ()=>{
  const today = new Date();
  const quarter = getActualQuarter(today);
  const year = today.getFullYear();
  switch (quarter) {
    case 1:
      return new Date (year,4,30);
    case 2:
      return new Date (year,8,31);
    case 3:
      return new Date (year,12,31);
    default:
      return new Date();
  }
}

const getLocale = ()=>{
    
}

const twoDigitsDateOptions = {
  day : "2-digit",
  month : "2-digit",
  year : "numeric"

}

module.exports = (
    addMinutesToDate,
    timeDifference
 )