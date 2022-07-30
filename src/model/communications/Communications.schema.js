const mongoose = require("mongoose")
const CommunicationsSchema = mongoose.Schema (
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
        customerSent: {
            type: Boolean,
            require
        },
        date: {
            type: Date,
            require
        },
        type:{
            type:String,
            maxLenght:20,
            default:"email"
        },
        duration: {
            type: Number,
        },
        subject: {
            type: String,
            maxLenght: 100,
            default: ""
        },
        notes: {
            type: String,
            maxLenght: 600,
            default: ""
        },
        follow: {
            type: String,
            maxLenght: 20,
            default: ""
        },
        alertfollow: {
            type: Date,
            require
        },
        thread: {
            type: Number,
        },
        readed: {
            type: Boolean,
            default: false,
        },
        answered: {
            type: Boolean,
            default: false,
        }
    }
);
 
module.exports ={
    CommunicationsSchema: mongoose.model('comm', CommunicationsSchema)
}
