var mongoose = require('mongoose');
var IdeaSchema = new mongoose.Schema({
  title : {
    type:String,
    required:true
  },
  Details : {
    type : String
  },
  // we should know which user add the idea now go to the add  idea and attach user
  UserAdd : {
    type:String,
    required : true
  },
  date : {
    type : Date,
    default : Date.now
  }
});

var IdeaSchema =  mongoose.model("ideas", IdeaSchema);
module.exports = IdeaSchema;
