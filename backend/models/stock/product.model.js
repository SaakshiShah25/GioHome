const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema(
    {
        name : {type:String},
        username : { type:String},
        description : {type:String},
        price : {type:Number},
        available_quantity : {type: String},
        date_produced : {type:Date},
        life : {type:Number},
        farmer_id : {type:Number},
        image : {type:String}
    
    },
    {
        timestamps : true
    }
);
const Product = mongoose.model('Product',product);

module.exports = Product