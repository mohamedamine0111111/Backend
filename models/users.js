const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
 firstName: String,
 lastName:String,
 email: String,
 address : [String|Number] ,
 phone: Number,
 token : String,
 password: String,

});

const User = mongoose.model('users', userSchema);

module.exports = User;