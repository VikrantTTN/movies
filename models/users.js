const Joi = require('joi');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv');
const boolean = require('joi/lib/types/boolean');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  
  
});

usersSchema.methods.generateToken=function(){
  const token=jwt.sign({_id:this._id},process.env.PRIVATEKEY) 
  return token
}

const User = mongoose.model('User', usersSchema);



function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(50).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;

//const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.PRIVATEKEY) 
//  return token

