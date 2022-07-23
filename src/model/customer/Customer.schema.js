const mongoose = require("mongoose")
const CustomerSchema = mongoose.Schema ({
 
    id:{
        type: mongoose.Schema.Types.ObjectId
    },

    addedAt: {
        type: Date
    },

    firstname: {
        type: String,
        maxlenght: 50,
        required: true
    },
    lastname: {
        type: String,
        maxlenght: 50,
        required: true
    },
    gender: {
        type: String,
        maxlenght: 10,
    },
    birthdate: {
        type: Date,
    },
    dni: {
        type: String,
        maxLenght: 12,
    },
    image: {
        type: String,
        maxlenght: 50
    },
    inbound: {
        type: String,
        maxlenght: 20
    },
    promotedToCustomer: {
        type: Date,
        default: new Date(),
    },
   
    emailhome: {
        type: String,
        maxlenght: 50,
    },
    emailwork: {
        type: String,
        maxlenght: 50,
        required: true
    },
    streetaddress: {
        type: String,
        maxlenght: 50,
    },
    cityaddress: {
        type: String,
        maxlenght: 20,
    },
    stateaddress: {
        type: String,
        maxlenght: 20,
    },
    postalcodeaddress: {
        type: String,
        maxlenght: 10,
    },
    countryaddress: {
        type: String,
        maxlenght: 50,
    },
    phonehome: {
        type: String,
        maxlenght: 11
    },
    phonework: {
        type: String,
        maxlenght: 11
    },
    whatsapp: {
        type: String,
        maxlenght: 11
    },
    socialmedia1: {
        type: String,
        maxlenght: 20
    },
    socialmedia2: {
        type: String,
        maxlenght: 20
    },
    socialmedia3: {
        type: String,
        maxlenght: 20
    },
    socialuser1: {
        type: String,
        maxlenght: 40
    },
    socialuser2: {
        type: String,
        maxlenght: 40
    },
    socialuser3: {
        type: String,
        maxlenght: 40
    },
    history: [
       {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            user: {
                type: String,
                maxLenght: 100,
                default: ""
            },
            date: {
                type: Date,
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
            cabin: {
                type: String,
                maxLenght: 20,
                default: ""
            },
            closed: {
                type: Date,
            },
            notes: {
                type: String,
                maxLenght: 200,
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
   ],
   appointments: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            user: {
                type: String,
                maxLenght: 100,
                default: ""
            },
            date: {
                type: Date,
            },
            startingTime : {
                type: Date,
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
            cabin: {
                type: String,
                maxLenght: 20,
                default: ""
            },
            status: {
                type: String,
                maxLenght: 20,
                default: ""
            },
            closed: {
                type: Date,
            },
            notes: {
                type: String,
                maxLenght: 200,
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
   ],
   communicactions: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            user: {
                type: String,
                maxLenght: 100,
                default: ""
            },
            direction:{
                type: String,
                maxLenght: 10,
                default: ""
            },
            date: {
                type: Date,
            },
            type:{
                type: String,
                maxLenght: 10,
                default: ""
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
                maxLenght: 200,
                default: ""
            },
            follow: {
                type: String,
                maxLenght: 10,
                default: ""
            },
            alertfollow: {
                type: Date,
            },
            thread: {
                type: Number,
            },
            readed: {
                type: Boolean,
                default: false
            },
            answered: {
                type: Boolean,
                default: false
            }
        }
    ],
    releaseForm:{
        file:{
            type: String,
            maxLenght: 100,
            default: ""
        },
        generated:{
            type: Boolean,
            default: false,
        },
        signed:{
            type: Boolean,
            default: false,
        },
    }
});
 
module.exports ={
   CustomerSchema: mongoose.model('customer', CustomerSchema)
}
