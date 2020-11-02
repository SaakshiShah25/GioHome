const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FarmerUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''    
},
lastName: {
    type: String,
    default: ''
},
email: {
    type: String,
    default: ''
},
address : {
    type : Array,
    default : []
}
,
password: {
    type: String,
    default: ''
},
isDeleted: {
    type: Boolean,
    default: false
}
});

FarmerUserSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

FarmerUserSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('FarmerUser', FarmerUserSchema);
