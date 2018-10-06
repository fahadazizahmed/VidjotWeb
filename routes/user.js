const express = require('express');
const router = express.Router();
var UserSchema = require('../Models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
var {isAuthenticated} = require('../helper/auth');
var {isNotAuthenticated} = require('../helper/auth');

router.get('/login',isAuthenticated ,function(req,res){
  res.render('users/login')
});

router.get('/register',isAuthenticated,function(req,res){
  res.render('users/register')
});

router.post('/register', isAuthenticated,async  function(req,res){

// Form validation
// make an array of Error
  let errors = [];

  if(!req.body.name){

      errors.push({text : 'Please Enter the name'});
  }

  if(!req.body.email){
      errors.push({text : 'Please Enter the Email'});
  }

  if(!req.body.password){
      errors.push({text : 'Please Enter the Password'});
  }

  if(!req.body.cpassword){
      errors.push({text : 'Please Enter the ConfrimPassword'});
  }
  if(req.body.cpassword != req.body.password){
      errors.push({text : 'password not match'});
  }
  if(req.body.password.length < 4){
      errors.push({text : 'password too short'});
  }


  if(errors.length > 0){
        res.render('users/register', {
          errors : errors,
          name : req.body.name,
          email : req.body.email,
          password: req.body.password,
          password2:req.body.cpassword

})
    }
    else{



//first take user email and check alread exist or // NOTE:

const user = await UserSchema.findOne({ 'email': req.body.email });
console.log("Email",user)

 if(user){
    req.flash('error_ms',"Email Already Exist");
    res.redirect('/users/register');
  }

else{
  const salt = await bcrypt.genSalt(10);
  const  hash =   await bcrypt.hash(req.body.password, salt);

  const newUser = new UserSchema({
    name:req.body.name,
    email : req.body.email,
    password:hash
  });


  newUser.save().then(function(user){
    req.flash('sucess_ms',"you are register");
    res.redirect('/users/login');
  });
}



}

});


//login using passport

router.post('/login',isAuthenticated, function(req,res,next){



  passport.authenticate('local',{//name of  strategy
    successRedirect:'/ideas',//if pass go to this url
    failureRedirect: '/users/login',// if fail go to this url
      failureFlash: true//we want to show flash message  o failure
  })(req,res,next)//

});



// logut the users

router.get("/logout",isNotAuthenticated,function(req,res){
  req.logout();
  req.flash('sucess_ms',"You are logout sucessfully")
  res.redirect('/users/login');

})















module.exports =  router;
