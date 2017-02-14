var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Bed = require('../models/bed');
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

router.get('/addmedication',checkAuthentication, function(req, res) {
    res.render('addmedication', { });
});

router.get('/addpatient',checkAuthentication, function(req, res) {
	
	Bed.find(function (err, bed) {
  if (err) return console.error(err);
  console.log(bed);
  res.render('addpatient', { beds : bed });
  
})
   
});


router.get('/addbed',checkAuthentication, function(req, res) {
    res.render('addbed', { });
});

router.get('/adddripset',checkAuthentication, function(req, res) {
    res.render('adddripset', { });
});

router.get('/adddripo',checkAuthentication, function(req, res) {
    res.render('adddripo', { });
});



router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, hname : req.body.hname }), req.body.password,  function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.post('/addpatient', function(req, res) {
	var patient_to_save= new Patient({
		pname: req.body.pname,
		pwt: req.body.pwt,
		pbed: req.body.bid
	});
	
	patient_to_save.save(function (err, pat) {
    if (err) return console.error(err);
    });
    res.redirect('/');
});   






    	
router.post('/addbed', function(req, res) {
	var bed_to_save= new Bed({
		bid: req.body.bid,
		//station: req.body.station
	});
	
	bed_to_save.save(function (err, pat) {
    if (err) return console.error(err);
    });
    res.render('addbed', { });
});     
		
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;

