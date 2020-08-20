const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema(
    {
        name : {type:String},
        username : { type:String},
        description : {type:String},
        price : {type:Number},
        available_quantity : {type: Number},
        date_produced : {type:Date},
        life : {type:Number} 
    
    },
    {
        timestamps : true
    }
);
const Product = mongoose.model('Product',product);

module.exports = Product