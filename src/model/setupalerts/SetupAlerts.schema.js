const mongoose = require("mongoose")
const SetupAlertsSchema = mongoose.Schema (
    {
        userId: {
            type: String,
            maxLenght: 40,
        },
        showAppoAlerts:{
            type: Boolean,
        },
        showCommAlerts:{
            type: Boolean,
        },
        showPast:{
            type: Boolean,
        },
        showComming:{
            type: Boolean,
        },
        pastDaysPeriod:{
            type: Number,
        },
        commingDaysPeriod:{
            type: Number,
        }
    }
);
 
module.exports ={
    SetupAlertsSchema: mongoose.model('setupalert', SetupAlertsSchema)
}
