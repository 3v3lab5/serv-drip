var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Bed = new Schema({
    bid: String,
    station: String   
});

module.exports = mongoose.model('Bed', Bed);

