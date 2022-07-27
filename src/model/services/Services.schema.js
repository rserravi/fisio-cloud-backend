const mongoose = require("mongoose")
const ServicesSchema = mongoose.Schema (
    {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        serviceName:{
            type: String,
            maxLenght: 40,
            default: "",
            require
        },
        priceXHour:{
            type: Number,
        }
    }
);
 
module.exports ={
   ServicesSchema: mongoose.model('service', ServicesSchema)
}
