const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

//email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


//for OTP

const sendOTP = async (email,otp) => {
    const otpmail = nodemailer.createTransport({
        service: "gmail",
        auth : {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailData = {
        from : process.env.EMAIL_FROM,
        to : email,
        subject: "Your One Time Password for verification!",
        text: `Your  one time password is ${otp}`,
    };

    try{
        await otpmail.sendMail(mailData);
        console.log("otp send successfully");
        console.log(mailData);
    }catch(error) {
        console.error(error);
        throw new Error("error sending otp email");
    }
};


module.exports = {transporter,sendOTP}

