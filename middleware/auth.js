const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
module.exports=function(req,res,next){
    const token=req.header('x-WebToken');
    if(!token) return res.status(401).send("Access Denied");
    try {

        const decoded=jwt.verify(token,process.env.PRIVATEKEY)
        req.user=decoded;
        next()
        
    } catch (error) {

        res.status(400).send("Invalid")
        
    }
    

}