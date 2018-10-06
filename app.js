var express = require('express');
var app = express();
const exphbs = require('express-handlebars')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var IdeaSchema = require('./Models/Idea');
var methodOvveride = require('method-override');
var flash = require('connect-flash')
var session = require('express-session')
var ideas =  require('./routes/ideas');
var user =  require('./routes/user');
var path = require('path')
const passport = require('passport');



const port = process.env.PORT || 3000; //we use port 3000 may be herouku use other port

//remove the warnign
mongoose.Promise = global.Promise;
//mongo db connection
// mongoose.connect('mongodb://localhost/Vidjot',{
//   useMongoclient : true
// }).then(()=> console.log('mongo database is connectd')).catch((err)=> console.log("error is ",err.message));
 // use this when production and use above when use local
 mongoose.connect('mongodb://fahad:fahad123@ds125073.mlab.com:25073/vidjot-prod',{
   useMongoclient : true
 }).then(()=> console.log('mongo database is connectd')).catch((err)=> console.log("error is ",err.message));

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOvveride('_method'))

app.use(session({
  secret : 'Secret',
  resave:true,
  saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//set global variabl
app.use(function(req,res,next){
  res.locals.sucess_msg = req.flash('sucess_ms');
  res.locals.error_msg = req.flash('error_ms');
  res.locals.error = req.flash('error');
  // if you are login you can get the user by req.user as we store in serialable
  res.locals.user = req.user || null;
  next();
});






//  How mideleware work
/*app.use(function(req,res,next){ //we use middleware we need to use next other wise it stuck here not go other. basically we get the req object added something into it and go next thats why with every request you can call req.name which we add with requuest
  req.name = 'Fahad',
  console.log(Date.now());
// if we not use next then index root not execute and show the output name and date
next();


})*/
app.get('/index', function(req,res){
  //  console.log(req.name);
  res.render('index',{title:'index'})
})

app.get('/about', function(req,res){
  //  console.log(req.name);
  res.render('about',{title:'about'})
})









//Error middleware
app.use(function(err,req,res,next){
  console.log(err.message)
 res.status(404).render('notFound')
});

app.use('/ideas',ideas);
app.use('/users',user);
const p = require ('./config/passport')(passport);


// Here app listen on the port 3000

app.listen(port,function(){
  console.log(`app listen on port ${port}`)
})
