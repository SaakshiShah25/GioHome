const mongoose = require('mongoose')

const Schema = mongoose.Schema

const order = new Schema(
    {
        name: {type:String},
        quantity: {type:Number},
        amount: {type:Number},
        status: {type:String},
        delivery_date: {type:Date}

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
const Order = mongoose.model('Order',order);

module.exports = Order