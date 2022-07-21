const e = require("express");
const express = require("express");
const { crossOriginResourcePolicy } = require("helmet");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helpers");
const { insertUser, getUserbyEmail } = require("../model/user/User.model");
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
        if (err.code===11000){
            res.json({message: "Email duplicado Prueba con otro email", err})
        }
        else{
            res.json({message: "Error en insertUser or user.router", err})
        }
    }
})

//User sign in Router
router.post("/login", async(req,res) =>{
    const {email, password} =req.body;

    //hash password and compare with the one in db

    if(!email || !password) {
        res.json({status:"error", message:"invalid form submission"})
    }

    //get user with email from db
    try {
        const user = await getUserbyEmail(email);
        console.log(user);
        const passFromDb = user && user.id ? user.password : null;
        if (!passFromDb) return res.json({status: "error", message:"Invalid email or password"})
        const result = await comparePassword(password, passFromDb);
        console.log(result);
        if (result){
            return res.json({status:"success", message: "Login successful"});
        }
        return res.json({status:"unauthorized", message:"Incorrect Password"})
    } catch (error) {
        console.log(error)
    }
 });
 
 
module.exports = router;


