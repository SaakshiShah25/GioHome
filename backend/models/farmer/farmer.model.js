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

findUser = function findUser(name, callback){
    Farmer.findOne({name: name}, function(err, userObj){
        if(err){
            return callback(err);
        } else if (userObj){
            return callback(null,userObj);
        } else {
            return callback();
        }
    });
}

findUser('Sanket', function(error, userFound) {
    console.log(userFound);
 });
module.exports = Farmer;