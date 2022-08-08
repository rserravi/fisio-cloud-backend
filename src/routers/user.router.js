const express = require("express");
const { json } = require("express/lib/response");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helpers");
const { insertUser, getUserbyEmail, getUserbyId, updatePassword, storeUserRefreshJWT, getAllUsers, updateUserById } = require("../model/user/User.model");
const { createAccessJWT, createRefreshJWT}= require("../helpers/jwt.helpers")
const { userAuthorization} = require("../middleware/authorization.middleware");
const { setPasswordResetPin, getPinbyEmailPin, deletePin } = require("../model/RestPin/RestPin.model")
const { emailProcessor } = require("../helpers/email.helpers");
const { resetPassReqValidation, updatePassValidation } = require("../middleware/formValidation.middleware");
const { deleteJWT } = require("../helpers/redis.helpers");

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
    //console.log(req.body)
    const { firstname,
            lastname,
            gender,
            birthdate,
            language,
            locales,
            dni,
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
            password,
         } = req.body;
    try {
        //hash password
        hashedPass = await hashPassword(password);
        const newUserObj = {
            firstname,
            lastname,
            gender,
            birthdate: new Date(birthdate),
            locales: locales?locales:language,
            dni,
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
            lastlogin : new Date(),
            password: hashedPass,
            createAccessJWT,
            createRefreshJWT
        }
        //console.log(newUserObj);
        const result = await insertUser(newUserObj);
        //console.log("RESULT",result);
        res.json({message: "New User Created", result})
    } catch (err) {
        if (err.code===11000){
            res.json({message: "Duplicated email. Try another one", err})
            console.log(err)
        }
        else{
            res.json({message: "Error en insertUser or user.router", err})
        }
    }
})

//UPDATE USER
router.patch("/", async(req,res)=>{
    
    const _id = req.params;
    const _frmdata = req.body;

    const userUpdated = await updateUserById(_id,_frmdata);
    return res.json({"message":"user updated"});
 })
 

//User sign in Router
router.post("/login", async(req,res) =>{
    const {email, password} =req.body;

    //console.log("DATOS EN LOGIN", email, password)

    //hash password and compare with the one in db

    if(!email || !password) {
        res.json({status:"error", message:"invalid form submission"})
    }

   
    try {
         //get user with email from db
        const user = await getUserbyEmail(email);
        //console.log("USER EN LOGIN",user)
        const passFromDb = user && user._id ? user.password : null;

        if (!passFromDb) return res.json({status: "error", message:"Invalid email or password"})
       
        const result = await comparePassword(password, passFromDb);
        //console.log("COMPARE PASSWORDS", user, email, password, passFromDb, result);
        
        if (!result){
            return res.json({status:"unauthorized", message:"Incorrect Password"})
        }

        //console.log("HAY USER EMAILWORK", user.emailwork, email)
       
        const accessJWT = await createAccessJWT(email, `${user._id}`); //NOTE: user._id is converted to string, to avoid passing as object
        const refreshJWT = await createRefreshJWT(email,`${user._id}`);
        return res.json({
            status:"success",
            message: "Login Successful",
            accessJWT,
            refreshJWT,
            user,
        });
 

    } catch (error) {
        console.log(error)
    }
 });

//Reset Password
 router.post("/reset-password", resetPassReqValidation, async (req, res)=>{
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

//Update password in DB
router.patch("/reset-password", updatePassValidation, async (req, res)=>{
    // 1- receive email, pin and new password
    const {email, pin, newPassword} = req.body;
    // 2- validate pin
    const getPin = await getPinbyEmailPin(email,pin);
    if (getPin._id){
        const dbDate = getPin.addedAt;
        const expiresIn = 1
        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
        const today = new Date();
        if (today > expDate){
            return res.json({status: "error", message: "Invalid or expired pin"});
        }
  
        //3- encrypt new password
        const hashedPass = await hashPassword(newPassword);
        //console.log( newPassword, + " "+ hashedPass);
        //4- update password in DB
        const user = await updatePassword(email,hashedPass);
        if (user._id) {
            // 5- send email notification
            const result = await emailProcessor(email, "", "password update success");
             if (result && result.messageId){
                res.json({status: "success", message:"Confirmation email sent. Check your inbox"});
             }
             //6- delete pins from database
            deletePin(email,pin);
            return res.json({status: "success", message:"Your password has been updated"})
        }
    }  
    res.json({status: "error", message:"Unable to update your password. Please, try again later."});
 });

 //Log out and clear tokens
router.delete("/logout", userAuthorization, async(req,res)=>{
    //1 - get jwt and verify // DONE by Middleware
  
    const {authorization} = req.headers;
    const _id = req.userId;
    //2 - delete accessJWT form redis database
    deleteJWT({authorization});
    //3 - delete refreshJWT from mongodb
    const result = await storeUserRefreshJWT(_id, "");
    if (result._id){
        return res.json({status:"success", message:"Logged out"});
    }
    res.json({status:"error", message:"Unable to log you out. Try again later"});
  
 })
 
 //Get all users
 router.get("/list", userAuthorization, async(req, res)=>{
    try {
        const result = await getAllUsers();
        return res.json({status:"success", result});
  
    } catch (error) {
        res.json({status:"error", message:error.message});
    }  
 })
 
 
module.exports = router;


