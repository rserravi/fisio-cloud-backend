const Joi = require("joi");
 
const email= Joi.string()
       .email({ minDomainSegments: 2,
       tlds: { allow: ['com', 'net', 'es', 'cat', 'edu'] }
               })

const newPassword = Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required();

const pin = Joi.string()
       .alphanum()
       .min(6)
       .max(6)
       .required();
 
const resetPassReqValidation = (req, res, next) =>{
       const schema = Joi.object({email});
       const value = schema.validate(req.body);
       if(value.error){
               res.json({status: "error", message: value.error.message});
       }
       next();
}

const updatePassValidation = (req, res, next) =>{
    console.log(req.body);
    const schema = Joi.object({email, pin, newPassword});

    const value = schema.validate(req.body);
    if(value.error){
            res.json({status: "error", message: value.error.message});
    }
    next();
}

 
module.exports = {
       resetPassReqValidation,
       updatePassValidation,
}
