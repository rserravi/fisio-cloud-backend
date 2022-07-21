const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helpers");
const { insertUser, getUserbyEmail } = require("../model/user/User.model");
const { createAccessJWT, createRefreshJWT}= require("../helpers/jwt.helpers")
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
            password: hashedPass,
            createAccessJWT,
            createRefreshJWT
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

   
    try {
         //get user with email from db
        const user = await getUserbyEmail(email);
        console.log(user);
        const passFromDb = user && user.id ? user.password : null;

        if (!passFromDb) return res.json({status: "error", message:"Invalid email or password"})
       
        const result = await comparePassword(password, passFromDb);
        console.log(result);
        
        if (!result){
            return res.json({status:"unauthorized", message:"Incorrect Password"})
        }
       
        const accessJWT = await createAccessJWT(user.email, `${user._id}`); //NOTE: user._id is converted to string, to avoid passing as object
        const refreshJWT = await createRefreshJWT(user.email,`${user._id}`);
        return res.json({
            status:"success",
            message: "Login Successful",
            accessJWT,
            refreshJWT,
        });
 

    } catch (error) {
        console.log(error)
    }
 });
 
 
module.exports = router;


