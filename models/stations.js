var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var bedin = new Schema({
	bid:String,
});



var Station = new Schema({
	uid:String,
	sname:String,
	beds:[bedin]
    
});

module.exports = mongoose.model('Station', Station);

