const mongoose = require("mongoose")
const UserSchema = mongoose.Schema ({
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
        maxlenght: 50,
    },
    dni: {
        type: String,
        maxLenght: 12,
    },
    locales: {
        type: String,
        maxlenght: 6,
    },
    role: {
        type: String,
        maxlenght: 10
    },
    image: {
        type: String,
        maxlenght: 50
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
        maxlenght: 20
    },
    socialuser2: {
        type: String,
        maxlenght: 20
    },
    socialuser3: {
        type: String,
        maxlenght: 20
    },
    password: {
        type: String,
        minlenght: 8,
        maxlenght: 100,
        required: true
    },
    lastlogin: {
        type: Date,
        maxlenght: 50,
    },
    refreshJWT: {
        token:{
            type: String,
            maxLenght:500,
            default: ''
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
    }, 
});
 
module.exports ={
   UserSchema: mongoose.model('user', UserSchema)
}
