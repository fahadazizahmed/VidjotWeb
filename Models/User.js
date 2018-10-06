var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name : {
    type:String

  },
  email : {
    type : String
  },
  password : {
    type : String

  }
});

var UserSchema =  mongoose.model("user", UserSchema );
module.exports = UserSchema;
