const mongoose = require("mongoose")
const LangSchema = mongoose.Schema ({
    id:{
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        maxlenght: 40,
        required: true
    },
    language: {
        type: String,
        maxlenght: 10,
        required: true
    },
});
 
module.exports ={
   LangSchema: mongoose.model('languajes', LangSchema)
}
