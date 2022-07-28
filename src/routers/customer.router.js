const express = require("express");
const { userAuthorization } = require("../middleware/authorization.middleware");
const { getAppointment } = require("../model/appointments/Appointments.model");
const { insertCustomer, getAllCustomers, getCustomerById, deleteCustomer } = require("../model/customer/Customer.model");
const { getHistory } = require("../model/history/History.model");
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
            birthdate: birthdate?new Date(birthdate):new Date(2000,1,1),
            dni,
            image,
            inbound,
            promotedToCustomer: promotedToCustomer? new Date(promotedToCustomer): new Date(2000,1,1),
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

 router.get("/", userAuthorization, async (req,res)=>{
    var result = [];
    try {
        const result2 = await getAllCustomers();
        for (const key in result2){
            var histories = await getHistory("","",result2[key]._id)
            var appointments = await getAppointment("","",result2[key]._id);
            // var comm = await getCommunications("","",result[key]._id);
            var item = {};
            
            item["_id"]=result2[key]._id;
            item["promotedToCustomer"]=result2[key].promotedToCustomer;
            item["firstname"]=result2[key].firstname;
            item["lastname"]=result2[key].lastname;
            item["dni"]=result2[key].dni;
            item["birthdate"]=result2[key].birthdate;
            item["image"]=result2[key].image;
            item["gender"]=result2[key].gender;
            item["inbound"]=result2[key].inbound;
            item["emailhome"]=result2[key].emailhome;
            item["emailwork"]=result2[key].emailwork;
            item["streetaddress"]=result2[key].stateaddress;
            item["cityaddress"]=result2[key].cityaddress;
            item["stateaddress"]=result2[key].streetaddress;
            item["postalcodeaddress"]=result2[key].postalcodeaddress;
            item["countryaddress"]=result2[key].countryaddress;
            item["phonehome"]=result2[key].phonehome;
            item["phonework"]=result2[key].phonework;
            item["whatsapp"]=result2[key].whatsapp;
            item["socialmedia1"]=result2[key].socialmedia1;
            item["socialmedia2"]=result2[key].socialmedia2;
            item["socialmedia3"]=result2[key].socialmedia3;
            item["socialuser1"]=result2[key].socialuser1;
            item["socialuser2"]=result2[key].socialuser2;
            item["socialuser3"]=result2[key].socialuser3;
            item["releaseForm"]=result2[key].releaseForm;
            item["history"]= histories
            item["appointments"]= appointments
            item["communications"]= [];
            result.push(item);
        }

        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 
 })

 // Get a specific customer
router.get("/:_custoId", userAuthorization, async (req,res)=>{
    var result = [];
    try {
        const {_custoId} = req.params;
        console.log("PARAMS",_custoId)
        const result2 = await getCustomerById(_custoId);
        
        var histories = await getHistory("","",_custoId)
        var appointments = await getAppointment("","",_custoId);
        // var comm = await getCommunications("","",_custoId);
        var item = [];
        var item = {};
            
        item["_id"]=result2[key]._id;
        item["promotedToCustomer"]=result2[key].promotedToCustomer;
        item["firstname"]=result2[key].firstname;
        item["lastname"]=result2[key].lastname;
        item["dni"]=result2[key].dni;
        item["birthdate"]=result2[key].birthdate;
        item["image"]=result2[key].image;
        item["gender"]=result2[key].gender;
        item["inbound"]=result2[key].inbound;
        item["emailhome"]=result2[key].emailhome;
        item["emailwork"]=result2[key].emailwork;
        item["streetaddress"]=result2[key].stateaddress;
        item["cityaddress"]=result2[key].cityaddress;
        item["stateaddress"]=result2[key].streetaddress;
        item["postalcodeaddress"]=result2[key].postalcodeaddress;
        item["countryaddress"]=result2[key].countryaddress;
        item["phonehome"]=result2[key].phonehome;
        item["phonework"]=result2[key].phonework;
        item["whatsapp"]=result2[key].whatsapp;
        item["socialmedia1"]=result2[key].socialmedia1;
        item["socialmedia2"]=result2[key].socialmedia2;
        item["socialmedia3"]=result2[key].socialmedia3;
        item["socialuser1"]=result2[key].socialuser1;
        item["socialuser2"]=result2[key].socialuser2;
        item["socialuser3"]=result2[key].socialuser3;
        item["releaseForm"]=result2[key].releaseForm;
        item["history"]= histories;
        item["appointments"]= appointments;
        item["communications"]= [];
        
        result.push(item);

        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 });
 
// Delete a customer
router.delete("/:_id", userAuthorization, async (req,res)=>{
    try {
        const {_id} = req.params;
        const result = await deleteCustomer({_id});
        console.log(result);
        return res.json({status:"success", message:"ticket deleted"});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 });
 
 
module.exports = router;