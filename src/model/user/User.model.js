const {UserSchema} = require("./User.schema");
 
const insertUser = userObj => {
   return new Promise((resolve, reject)=>{
       UserSchema(userObj)
       .save()
       .then(data => resolve(data))
       .catch(error => reject(error))
   })
};

const getUserbyEmail = email =>{
   return new Promise((resolve,reject)=>{
       if((!email)) return false;
       try{
           UserSchema.findOne({email}, (error, data)=>{
           if(error){
               resolve(error);
           }
           resolve(data);
           })
       } catch (error) {
           reject(error);
       }
   });
};

const storeUserRefreshJWT = (_id, token) => {
   console.log(_id);
   return new Promise((resolve, reject)=>{
       try {
           UserSchema.findOneAndUpdate(
               {_id},
               {$set: {"refreshJWT.token": token, "refreshJWT.addedAt": Date.now()}},
               {new: true}, (error, data) =>{
                   if(error){
                       reject(error);
                   }
                   resolve(data);
                   console.log(data);
                   }
           ).clone();
       } catch (error) {
           reject(error);       
       }
   })
}

 
module.exports = {
   insertUser,
   getUserbyEmail,
   storeUserRefreshJWT,
};
