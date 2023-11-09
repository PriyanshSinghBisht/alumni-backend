const User = require('../Database/models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')

const sendEmail = async({email,  emailType, userId})=>{
     try {
   const hashedToken =  await bcrypt.hash(userId.toString(), 10)
       
        if(emailType === "VERIFY"){
             await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken, verifyTokenExpiry: Date.now()+3600000})
        }else if(emailType === "RESET"){
             await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry: Date.now()+3600000})
        }

        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASSWORD
        }
      });

        const mailOptions = {
            from: 'alumguid@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" 
            :"Reset your password",
            html: `<p> TO, ${
            emailType === "VERIFY" ? "verify your email" : 
            "reset your password"} copy and past the token below 
            in your app. 
            </br>token=${hashedToken}</br></p>`
        }
        console.log(transporter, "options:", mailOptions)
        const mailresponse = await transporter.sendMail(mailOptions)

        return mailresponse;
     } catch (error) {
          throw new Error(error.message)
     }
}

module.exports = sendEmail