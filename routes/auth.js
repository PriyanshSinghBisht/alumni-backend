const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();
const User = require('../Database/models/User');

const sendEmail = require('../helper/mailer')

router.post('/register',async(req,res)=>{
  try{
    const {
      name,
      email,
      password,
      gender,
      batch,
      roll_no,
      phoneNumber,
      pushToken
       } = req.body;
       
  const existedUser= await User.findOne({email});
  
    if(existedUser){
     return res.status(404).json({error:'user with this email is already exists.please try again with another email!'});
    }
    
    //TODO return invalid if any field is empty
  const user = new User({
    name,
    email,
    password,
    gender,
    batch,
    roll_no,
    phoneNumber,
    pushToken
  })

  await user.save();
  
  res.status(200).json({success:true,token: user._id})
  }
  catch(error){
    console.error('Internal Server Error:',error);
    res.status(500).json('Internal Server Error');
  }
})

router.post('/login', async(req,res)=>{
     try{
        const {email, password,pushToken} = req.body;
        const user = await User.findOne({email});
        if(!user){
         return res.status(404).json({error:'the email does not exists . please register with the email first!'});
        }
    
        if(user.password!==password){
          return res.status(404).json({error:'invalid password!'})
        }
        
        user.pushToken = pushToken;
          res.status(200).json({success:true,token: user._id});
        
     }catch(error){
       console.error('login server error',error)
      res.status(500).error('Internal Server Error');
     }
})

router.post('/reset-password-request', async(req,res)=>{
   try{
     const {email} = req.body;
     const user =await User.findOne({email});
        if(!user){
         return res.status(404).json({error:'invalid email!'});
        }
  //sending token to email
    await sendEmail({
            email, emailType: "RESET", 
            userId: user._id
         })
         
    res.status(200).json({success:true,message:'token send successfully'})
   }
   catch(error){
     console.error('/reset-password-request server error:',error);
      res.status(500).error('Internal Server Error');
   }
})

router.post('/reset-password-verify', async(req,res)=>{
    const {email,password,token} = req.body;
   const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
   if(!user){
    return resstatus(400).json({error:'invalid token'})
   }
   
   user.password = password;
   user.forgotPasswordTokenExpiry = undefined;
   user.forgotPasswordToken = undefined;
   user.save();
   
   res.status(200).json({success:true,message:'password reset successfully!'})
})

router.post('/verifyUser-request', async(req,res)=>{
   const {email} = req.body;
   const user = await User.findOne({email});
   if(!user || user.isVerified){
     return res.status(400).json('invalid request')
   }
    await sendEmail({
            email, emailType: "VERIFY", 
            userId: user._id
         });
    res.status(200).json({success:true,message:'token send successfully!'})
})

router.post('/userVerify-verify', async(req,res)=>{
     const {email,password,token} = req.body;
   const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
   if(!user){
    return res.status(400).json({error:'invalid token'})
   }
   
   user.isVerified = true
   user.verifyTokenExpiry = undefined;
   user.verifyToken = undefined;
   user.save();
   
   res.status(200).json({success:true,message:'email verified successfully!'})
})

module.exports = router