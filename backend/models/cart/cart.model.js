const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = new Schema(
    {
        name : {type: String},
        products : { type:Array },
        email : {type:String}  
    },
    {
        timestamps : true
    }
);
const cart = mongoose.model('Cart',Cart);

module.exports = cart