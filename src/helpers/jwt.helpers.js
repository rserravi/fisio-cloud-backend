const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.helpers");
const {storeUserRefreshJWT} = require("../model/user/User.model")

 
const createAccessJWT = async(email, _id) =>{
    console.log("EMAIL EN CREATEACCESS", email)

    return new Promise (async(resolve,reject)=>{
        try {
            const accessJWT = jwt.sign({email},
                process.env.JWT_ACCESS_SECRET,
                {expiresIn:"15m"}
                );
            
            await setJWT(accessJWT, _id);
            return resolve(accessJWT);
            
        } catch (error) {
            reject(error);
        } 
    }) 
};
 
const createRefreshJWT = async (payload, _id) =>{
    console.log("PAYLOAD EN CREATEREFRESH", payload)
    return new Promise (async(resolve,reject)=>{
        try {
        const refreshJWT = jwt.sign({payload},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: "30d"},
            );
        
        await storeUserRefreshJWT(_id, refreshJWT);
        return resolve(refreshJWT);
        } 
        catch (error) 
        {
            return reject(error);
        }
    }) 
}

const verifyAccessJWT = userJWT => {
    try {
        return Promise.resolve( jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
    } catch (error) {
        return Promise.resolve(error)
    }
 }
 
const verifyRefreshJWT = userJWT => {
    try {
        return Promise.resolve( jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    } catch (error) {
        return Promise.reject(error);
    }
}
 
    

 
module.exports = {
   createAccessJWT,
   createRefreshJWT,
   verifyAccessJWT,
   verifyRefreshJWT,
}
