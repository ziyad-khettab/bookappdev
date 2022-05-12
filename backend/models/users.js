const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname : {
        type: String,
        required : [true, 'Please enter your firstname'],
        trim : true,
    },
    lastname :{
        type : String,
        required : [true, 'Please enter your lastname'],
        trim : true,
    },
    username :{
        type : String,
        required : [true, 'Please provide a username'],
        unique : true,
        trim : true,
    },
    email : {
        type : String,
        required : [true, 'Please provide an email'],
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type :String,
        required : [true, 'Please provide a password'],
        trim : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},
{
    timestamps : true
});
    
module.exports = mongoose.model('User', userSchema);