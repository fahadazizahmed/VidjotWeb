// thing we need
const LocalStrategy = require('passport-local').Strategy;//we need this Strategy
const mongoose = require('mongoose')//for login we need mongomethod search
const bcrypt = require('bcrypt'); // decrypt the password
const myUser  = require('../Models/User');//get model where you search the user

module.exports = function(passport){
  passport.use(new LocalStrategy({
    usernameField: 'email'

},async (email,pass,done) => {
  console.log(email);//login form connected to the strategy
  //console.log(pass);

// first we find the user against Email


// first we find the user against Email
const user = await myUser.findOne({email:email});
//console.log("existUser")
//if user not exist
if(!user){
  return done(null,false,{message : "user not exist"})//first parameter is error second parameter is user so no user return give null third parameter is message bydefault message show take error field in our msg_handlebars
}
//console.log(existUser.password)
// if user exist then we match the password
const userPassword =    await bcrypt.compare(pass,user.password)
if(!userPassword){
  return done(null,false,{message : "password not match"})//first parameter is error second parameter is user so no user return give null third parameter is message bydefault message show take error field in our msg_handlebars
}
console.log("Finally")
return done(null, user);



}

));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  myUser.findById(id, function(err, user) {
    done(err, user);
  });
});













}
