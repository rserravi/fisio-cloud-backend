const express = require("express");
const { insertCustomer } = require("../model/customer/Customer.model");
const router = express.Router();
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return from customer router"});
   next();
});

router.post("/", async (req,res)=>{
    const { 
        firstname,
        lastname,
        gender,
        birthdate,
        dni,
        image,
        inbound,
        promotedToCustomer,
        emailhome,
        emailwork,
        streetaddress,
        cityaddress,
        stateaddress,
        postalcodeaddress,
        countryaddress,
        phonehome,
        phonework,
        whatsapp,
        socialmedia1,
        socialmedia2,
        socialmedia3,
        socialuser1,
        socialuser2,
        socialuser3,
        releaseForm:{
            file,
            generated,
            signed
        }

     } = req.body;
     try {
        const newUserObj = {
            addedAt: new Date(),
            firstname,
            lastname,
            gender,
            birthdate: new Date(birthdate),
            dni,
            image,
            inbound,
            promotedToCustomer: new Date(promotedToCustomer),
            emailhome,
            emailwork,
            streetaddress,
            cityaddress,
            stateaddress,
            postalcodeaddress,
            countryaddress,
            phonehome,
            phonework,
            whatsapp,
            socialmedia1,
            socialmedia2,
            socialmedia3,
            socialuser1,
            socialuser2,
            socialuser3,
            history:[],
            appoinments:[],
            communicactions:[],
            file,
            generated,
            signed        
        }
        console.log("NEW USER OBJ", newUserObj);
        const result = await insertCustomer(newUserObj);
        console.log("RESULT",result);
        res.json({message: "New Customer Created", result})
    } catch (err) {
        if (err.code===11000){
            res.json({message: "Email duplicado. Prueba con otro email", err})
        }
        else{
            res.json({message: "Error en insertCustomer or customer.router", err})
        }
    }
   
 })
 
 
module.exports = router;