const redis = require("redis");
const client = redis.createClient({legacyMode: true},process.env.REDIS_URL);
 
const setJWT = (key, value) =>{
   return new Promise(async(resolve, reject)=>{
 
       try {
           await client.connect();
           client.set(key, value, (err, res)=>{
               if(err) reject(err)
               resolve(res)
           });
       } catch (error) {
           reject(error);
       }
   })
}
 
const getJWT = (key) =>{
   return new Promise(async(resolve, reject)=>{
 
       try {
           await client.connect();
           client.get(key, (err, res)=>{
               if(err) reject(err)
               resolve(res)
           });
       } catch (error) {
           reject(error);
       }
   })
}
 
module.exports = {
   setJWT,
   getJWT,
}
