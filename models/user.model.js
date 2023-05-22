const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{type:String,required:true},
    role:{type:String,default:'explorer',enum:['explorer','seller']},
    password:{type:String, required:true}
});


const UserModel = mongoose.model('user',UserSchema);

module.exports = {
    UserModel
};
