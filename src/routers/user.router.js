const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helpers");
const { insertUser, getUserbyEmail, getUserbyId } = require("../model/user/User.model");
const { createAccessJWT, createRefreshJWT}= require("../helpers/jwt.helpers")
const { userAuthorization} = require("../middleware/authorization.middleware");
const { setPasswordResetPin } = require("../model/RestPin/RestPin.model")
const { emailProcessor } = require("../helpers/email.helpers")

const router = express.Router();
 
 
router.all("/", (req, res, next) =>{
   //res.json({message: "return form user router"});
   next();
});

//Get user profile router
router.get("/",userAuthorization, async(req,res)=>{
    const _id = req.userId;
    const userProf = await getUserbyId(_id);
    res.json ({user: userProf});
 })
 

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

        console.log("HAY USER EMAILWORK", user.emailwork, email)
       
        const accessJWT = await createAccessJWT(email, `${user._id}`); //NOTE: user._id is converted to string, to avoid passing as object
        const refreshJWT = await createRefreshJWT(email,`${user._id}`);
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

//Reset Password
 router.post("/reset-password", async (req, res)=>{
    //A - Create and send password reset pin number
    //1- receive email
    const {email} = req.body;

    //2- check user exists for the email
    const user = await getUserbyEmail(email);

    if (user && user._id){
        //3- create unique 6 digit pin
        //4- save pin and email in database        
        const setPin = await setPasswordResetPin(email);
        //5 - email the pìn
        const result = await emailProcessor(email, setPin.pin);

        if (result && result.messageId){
            res.json({status: "success", message:"If the email exists in our databes, the password reset pin will be send shortly"});
        }

        return res.json(setPin);
    }
    res.json({status: "error", message:"unable to process your request at the moment - Try again later"});

    res.json({status: "error", message:"If the email exists in our databes, the password reset pin will be send shortly"});
});

 
module.exports = router;


