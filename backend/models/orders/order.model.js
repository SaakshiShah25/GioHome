const mongoose = require('mongoose')

const Schema = mongoose.Schema

const order = new Schema(
    {
        name: {type:String},
        // Order ID should come here
        quantity: {type:Number},
        
        status: {type:String},
        delivery_date: {type:Date},

        // Example Schema
        
        // username : { type: String, required : true},
        // description : { type : String, required : true},
        // duration : {type : String , required : true},
        // date : {type : Date , required : true}
        address: {type:String},
        delivery: {type:String},
        net_amount: {type:Number},
        payment: {type:String},
        products:{type:Array},
        email : {type:String}

    },
    {
        timestamps : true
    }
);
const Order = mongoose.model('Order',order);

module.exports = Order