const {User} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _=require('lodash');
const bcrypt=require('bcrypt');
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const dotenv=require("dotenv").config();


router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid Credentials");

    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid Credentials");
    const token=user.generateToken();

    res.send(token);
});

function validateLogin(user) {
    const schema = {
      email: Joi.string().min(3).max(50).required().email(),
      password: Joi.string().min(3).max(50).required()
    };
  
    return Joi.validate(user, schema);
  }
  

module.exports=router;


//http://localhost:3000/api/users

// {
//     "name":"Vikrant",
//     "email":"vikrant@tothenew.com",
//     "password":"vikrant"
// }