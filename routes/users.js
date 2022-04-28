const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _=require('lodash');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/',async(req,res)=>{
    const users=await User.find();
    res.send(users);
})

router.get('/me',auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password');
    res.send(user);
})


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user= await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already Registered");


    
    user=new User(_.pick(req.body,['name','email','password','isAdmin']))
    const salt= await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save()

    const token=user.generateToken();

    res.header('x-WebToken',token).send(_.pick(user,['_id','name','email','isAdmin']));
});

module.exports=router;
//http://localhost:3000/api/users

// {
//     "name":"Vikrant",
//     "email":"vikrant@tothenew.com",
//     "password":"vikrant"
// }