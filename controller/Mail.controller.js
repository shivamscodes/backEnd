import nodemailer from 'nodemailer';


 function Mail(email,password) {
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user:process.env.user,
        pass:process.env.pass
    }
});
const frontendurl = process.env.frontendurl || "http://localhost:3000/resetpassword/";

let mailOptions = {
  from: 'sshivu657@gmail.com',
  to: email,
  subject: 'Verification Email PawnShop',
  html: `
    <h1>Welcome to myproject</h1>
    <p>You have successfully registered on our site</p>

    <h2>Your login credentials are below:</h2>
    <h4>Username: ${email}</h4>
    <h4>Password: ${password}</h4>

    <h2>Click the link below to verify your account:</h2>
    <a href="${frontendurl}${email}">Click to verify account</a>
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

export default  Mail;