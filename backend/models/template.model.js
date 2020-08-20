const mongoose = require('mongoose')

const Schema = mongoose.Schema

const templateSchema = new Schema(
    {
        // Example Schema
        
        // username : { type: String, required : true},
        // description : { type : String, required : true},
        // duration : {type : String , required : true},
        // date : {type : Date , required : true}

    },
    {
        timestamps : true
    }
);
const Template = mongoose.model('Template',templateSchema);

module.exports = Template