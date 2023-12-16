const mongoose = require('mongoose');

const cleanerSchema = mongoose.Schema({

 
 email: String,
 phone: Number,
 firstName: String,
 lastName:String,

});

const Cleaner = mongoose.model('cleaners', cleanerSchema);

module.exports = Cleaner;



