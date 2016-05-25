var mongoose = require("mongoose");
mongoose.connect('mongodb://84.200.4.71:27017/testmongo');

var mongoSchema = mongoose.Schema;

var userSchema = {
  "userEmail" : String,
  "userPassword" : String
};

module.exports = mongoose.model('userLogin', userSchema);
