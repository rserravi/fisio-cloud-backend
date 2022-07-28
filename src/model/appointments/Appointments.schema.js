const mongoose = require("mongoose")
const AppoSchema = mongoose.Schema (
    {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        userId: {
            type: String,
            maxLenght: 40,
            default: "",
            require
        },
        customerId: {
            type: String,
            maxLenght: 40,
            default: "",
            require
        },
        date: {
            type: Date,
            require
        },
        duration: {
            type: Number,
        },
        service: {
            type: String,
            maxLenght: 100,
            default: ""
        },
        cabin: {
            type: String,
            maxLenght: 100,
            default: ""
        },
        price: {
            type: Number,
        },
        paid: {
            type: Number,
        },
        status: {
            type: String,
            maxLenght: 40,
            default: "",
        },
        closed: {
            type: Date,
        },
        notes: {
            type: String,
            maxLenght: 600,
            default: ""
        },
        attachment : [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                name: {
                    type: String,
                    maxLenght: 100,
                    default: ""
                },
                file: {
                    type: String,
                    maxLenght: 100,
                    default: ""
                }
            }
        ]    
    }
);
 
module.exports ={
    AppoSchema: mongoose.model('appointment', AppoSchema)
}
