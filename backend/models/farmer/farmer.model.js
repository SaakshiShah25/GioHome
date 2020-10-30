const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmer = new Schema(
    {
        
        name : { type:String, required : true, trim: true },
        location : { type:String },
        products : { type:Array },
        

    },

);
const Farmer = mongoose.model('Farmer',farmer);


module.exports = Farmer;