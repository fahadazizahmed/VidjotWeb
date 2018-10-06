
module.exports = {
isNotAuthenticated  : (req, res, next) => {

if (req.isAuthenticated()) {

  //if(req.user){//it  work same as above
  // mean user already login go  to next mean you can go to ideas and add/ideas

      return next();
    } else {
      req.flash('error', 'Sorry, but you must be login first!');
      res.redirect('/users/login');
    }

},

/////


isAuthenticated :  (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Sorry, but you are already logged in!');
    res.redirect('/ideas');
  } else {
    return next();
  }
}





///////





}
