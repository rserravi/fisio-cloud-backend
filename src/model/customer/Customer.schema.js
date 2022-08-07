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
    },
    lastname: {
        type: String,
        maxlenght: 50,
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
