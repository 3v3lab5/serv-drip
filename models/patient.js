var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Patient = new Schema({
    pname: String,
    pwt: String, 
    pbed: String  
});

module.exports = mongoose.model('Patient', Patient);

