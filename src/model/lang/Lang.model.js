const {LangSchema}= require ("./Lang.schema");

const insertLanguage = langObj =>{
    return new Promise((resolve,reject)=>{
        try {
            LangSchema(langObj)
            .save()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN INSERT LANGUAJE", error)
            reject(error);
        }
    });
}

const getAllLanguages = () =>{
    return new Promise((resolve,reject)=>{
        try {
            LangSchema
            .find()           
            .then((data)=>resolve(data))
            .catch((error)=> reject(error));
        } catch (error) {
            console.log("ERROR EN GET ALL LANGUAGES", error)
            reject(error);
        }
    });
}


module.exports = {
    insertLanguage,
    getAllLanguages
 }
 