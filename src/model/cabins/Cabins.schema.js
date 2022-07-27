const mongoose = require("mongoose")
const CabinsSchema = mongoose.Schema (
    {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        cabinName:{
            type: String,
            maxLenght: 40,
            default: "",
            require
        },
        description:{
            type: String,
            maxLenght: 40,
            default: ""
        }
    }
);
 
module.exports ={
    CabinsSchema: mongoose.model('cabin', CabinsSchema)
}
