const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const ValidateRegister = require('../../validation/register')
const ValidateLogin = require ('../../validation/login')

router.get('/test',(req,res)=>res.json({msg :'it is working'}));
router.post('/register',(req,res)=>{
    const {errors,isValid} = ValidateRegister(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    
     
    User.findOne({email:req.body.email})
    .then(() =>{
      errors.email ='email already exists';
      if(user){
          return res.status(400).json(errors);
      }
      else{
            const avatar = gravatar.url(req.body.email,
            {
                s:'200',
                r:'pg',
                d:'mm'
            });
        

            const newUser = new User(
            {
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
    
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err))
            })
        })
    }
})    
 })
 router.post('/login',(req,res)=>{
     const {errors,isValid} = ValidateLogin(req.body);
      if(!isValid){
         return res.status(400).json(errors);
     } 
     const email = req.body.email;
     const password = req.body.password;
 
     //find user by name 
     User.findOne({email})
      .then(user => {
          if (!user){
             errors.email = 'email not found';
             return res.status(400).json(errors);
          }
         bcrypt.compare(password,user.password)
           .then(isMatch => {
               if(isMatch){
                   const payload = {
                       id : user.id,
                       name : user.name,
                       avatar : user.avatar
                   };
                 
                   jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                       res.json({
                           sucess: true,
                           token : 'Bearer'+token
                       })
                     })
                 }
                 else{
                     errors.passwords ='Password incorrect';
                     res.status(400).json(errors)
                 }
                   
             
                 
             })
           
    
 
             
     })   
 })

module.exports = router;
