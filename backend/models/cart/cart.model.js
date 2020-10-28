const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = new Schema(
    {
        name : {type: String},
        products : { type:Array },  
    },
    {
        timestamps : true
    }
);
const cart = mongoose.model('Cart',Cart);

module.exports = cart