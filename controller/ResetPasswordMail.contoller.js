import nodemailer from 'nodemailer';


 

 const ResetPasswordMail = (req,res)=> {

    const email = req.body.email;
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
         user:process.env.user,
        pass:process.env.pass
    }
});const frontendurl = process.env.frontendurl || "http://localhost:3000/resetpassword/";

let mailOptions = {
  from: 'sshivu657@gmail.com',
  to: email,
  subject: 'Reset Password Of Your Account',
  html: `
    <h1>Welcome to MyProject</h1>
    <p>Your email has been verified successfully.</p>

    <h2>Password Reset Link</h2>
    <p>Click the link below to reset your account password:</p>

    <a href="${frontendurl}${email}">Reset Password</a>
  `
};


transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        console.log(error);
    }else{
        console.log("email send : "+ info.response);
    }
});

}

// mail('sshivu657@gmail.com', "lfdmnjembtytkdbm");

export default  ResetPasswordMail;