const mongoose = require('mongoose');

const FarmerUserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('FarmerUserSession', FarmerUserSessionSchema);
