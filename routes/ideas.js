const express = require('express');
const router = express.Router();
var IdeaSchema = require('../Models/Idea');
var mongoose = require('mongoose');
var {isNotAuthenticated} = require('../helper/auth');




//Show add Idea Form
router.get('/add', isNotAuthenticated,function(req,res){
   res.render('ideas/add')
})

//Add the Idea to database
router.post('/',isNotAuthenticated,function(req,res,next){

// make an array of Error
  let errors = [];

 // if description is missong it add error in array
  if(!req.body.Details){

     errors.push({text : 'Please add des'});
  }
  // if title is missong it add error in array
  if(!req.body.title){
      errors.push({text : 'Please add title'});
  }
  //now it check the  error array if it is 0 mean no error it go further otherwuse it show erro this  is other  way to show error insted of falsh
//also we send title and des because if user  enter title but not description on error title tag not empty it still show the use enter value
  if(errors.length > 0){
      res.render('ideas/add', {
        errors : errors,
        title:
        req.body.title,
        description:req.body.Details})
  }
  // now if there is no eroor
  else {
   const i = new IdeaSchema();
    i.title = req.body.title;
    i.Details = req.body.Details;
    i.UserAdd  = req.user.id;

    //One way of store
  /*  i.save(function(err){
      if (err)
               {
                 console.log("Errroe s",err);
                  res.send(err)
               }
               else
               {
               console.log("Sucess","Data Add");
                 res.render('ideas/add',{Suc:'added data Sucess'});
               }

    });*/
    //Second way
  //  IdeaSchema.create(req.body).then(function(user){
  //    console.log("Sucess",user);
  //      res.render('ideas/add');
  //  })

//Third way
i.save().then(function(idea){
    req.flash('sucess_ms','Data Added Sceefully')
         res.redirect('/ideas');
}).catch(next);
  }

});

// Get All the // IDEA:


// it will get all the idea from the IdeaSchema and pass the idea to index and pass the sucess msg to Index
router.get('/', isNotAuthenticated,function(req,res,next){
  //console.log("req.user.id",req.user.id)
  IdeaSchema.find({UserAdd: req.user.id}).sort({date:'desc'}).then(function(ideas){
  //req.flash('sucess_ms','get All Story Suceesfully')
     res.render('ideas/index',{data:ideas})
  }).catch(next)
//
})


// Edit the IdeaSchema

// get For Edit
//

router.get('/edit/:id',isNotAuthenticated,function(req,res,next){
  //console.log("Id",editIdeas.UserAdd);


  IdeaSchema.findOne({_id: req.params.id}).
  then(function(editIdeas){
    if(editIdeas.UserAdd != req.user.id){
    req.flash("error_ms","Not authenticate user");
    res.redirect('/ideas')
    }
    else {
      res.render('ideas/edit',{
        ideas:editIdeas
      });
    }

  //  console.log("Edit Ideas",editIdeas);

  }).catch(next)


});

// Update the Database

router.put('/:id',function(req,res){
  IdeaSchema.findOne({_id: req.params.id}).then(function(getIdea){
  //  console.log("prevoius idea",getIdea)
    getIdea.title=req.body.title;
    getIdea.Details = req.body.Details;
    getIdea.save().then(function(newIdea){
      req.flash('sucess_ms','Idea updated Sucess')
     res.redirect('/ideas')

    })


  })
})




// Delet the // IDEA:


router.delete('/:id',function(req,res){
  IdeaSchema.remove({_id:req.params.id}).then(function(deleteIdea){
    req.flash('sucess_ms','Idea is Deleted')
         res.redirect('/ideas')
  })
})


module.exports = router;
