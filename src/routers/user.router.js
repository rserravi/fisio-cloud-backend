const express = require("express");
const { hashPassword } = require("../helpers/bcrypt.helpers");
const { insertUser } = require("../model/user/User.model");
const router = express.Router();
 
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return form user router"});
   next();
});

router.post("/", async(req, res) => {
    const { firstname,
            lastname,
            gender,
            birhdate,
            locales,
            role,
            image,
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
            password
         } = req.body;
    try {
        //hash password
        const hashedPass = await hashPassword(password);
        const newUserObj = {
            firstname,
            lastname,
            gender,
            birhdate,
            locales,
            role,
            image,
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
            password: hashedPass
        }
        const result = await insertUser(newUserObj);
        console.log("RESULT",result);
        res.json({message: "New User Created", result})
    } catch (err) {
        res.json({message: "Error en insertUser or user.router", err})
    }
})

 
module.exports = router;


