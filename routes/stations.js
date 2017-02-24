var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Station= require('../models/stations');
var router = express.Router();


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/login");
    }
}


router.get('/',checkAuthentication, function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/addstation',checkAuthentication, function (req, res) {
console.log(req.query.add_flag);
if(req.query.add_flag=='more'){
	  res.render('addstation', { user : req.user , add_flag:'more'});
}else{
Station.count({uid:req.user.id}, function(err, count){
	console.log(count);
	if(count==0){
      res.render('addstation', { user : req.user , add_flag:'newuser'});
  }else{
	  console.log(req.body.stations);
	  
	  Station.find(function (err, stat) {
      if (err) return console.error(err);
      res.render('addstation', { user : req.user , add_flag:'select',stations:stat});
      })
	 
  }
});

}



   
});

router.get('/addpatient',checkAuthentication, function (req, res) {
	
   res.render('addpatient', { user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});


router.post('/addstation',checkAuthentication, function (req, res) {
    var station_to_add = new Station({ sname: req.body.sname,uid:req.user.id,beds:[]});
    station_to_add .save(function (err,station_to_add) {
			if (err) return console.error(err);
			else res.redirect('/');
			});
});



router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});
 
		

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/addstation?add_flag=null');
});



module.exports = router;

