const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User=require("../models/userModel");
const jwt = require("jsonwebtoken");
const {transporter,sendOTP} = require("../config/emailValidation");



//otp genaration function

function otpGeneration(){
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationOfOtp = Date.now() + 2* 60 * 1000;

  return { otp , expirationOfOtp };
}


//@descr register
//@route post/api/register
//@access  public

const registerUser = asyncHandler(async (req,res) => {
  
  const {username,email,password} = req.body;
  console.log(req.body);

  if(!username||!email||!password){
    res.status(400);
    throw new Error("all Fields are required");
  }

  const userAvailable = await User.findOne({email});
  if(userAvailable){
    res.render('signup',{
      alreadyExists:"user exists. change the mail "
    });
  }else{

    const hashPassword = await bcrypt.hash(password,10);

    const {otp , expirationOfOtp } = otpGeneration();

    req.session.signupData = { username, email, password: hashPassword, otpGeneration : otp, expirationOfOtp } ;

    sendOTP(email,otp); //send OTP to email

    return res.redirect('/otpVerification')
  }
});



const otpVerify = asyncHandler(async (req,res) => {
  const { otp } = req.body;
  if(!req.session.signupData) {
    return res.render("otpVerification", {
      error : " data not found. please try again."
    });
  }

  const { username, email, password, otpGeneration , expirationOfOtp } = req.session.signupData;


  if(Date.now() > expirationOfOtp) {

    delete req.session.signupData;
    return res.render("otpVerification",{otpMismatch:"OTP has expired. Please request a new one."})
  }

  if(otp === otpGeneration) {

    const userdata = await  User.create({

      username,
      email,
      password,
    });

    delete req.session.signupData ;


    console.log(userdata);
    return res.redirect("/sign_in");
  }
  else {
    return res.render("/sign_up",{
      error:"incorrect otp"
    });
  }
});




// const  registerUser = asyncHandler(async (req, res) => {

//     const {username,email,password} = req.body;
//     if(!username||!email||!password){

//         res.status(400);
//         throw new Error("all Fields are required");
//     }
    
//     const userAvailable = await User.findOne({email});
//     if(userAvailable){
//         res.status(400)
//         throw new Error("user already registered!");
//     }

//     //hash password

//     const hashPassword = await bcrypt.hash(password,10);
//     console.log("hashed password is: ",hashPassword);

//     const createUser = await User.create({
//         username,email,password:hashPassword
//     });

//     console.log(`user created ${createUser}`);

//     if(createUser){
//         res.status(201).json({_id:createUser.id,email:createUser.email})
//     }else{
//         res.status(400);
//         throw new Error("user data not valid");
//     }


   
// });

//@descr login
//@route post/api/login
//@access  public
// const  loginUser = asyncHandler(async (req, res) => {
//     const {email,password} = req.body;
//     if(!email||!password){
//         res.status(400);
//         throw new Error("All field needed")
//     }
//     const user = await User.findOne({email});

//     if(user && (await bcrypt.compare(password, user.password))){

//         const accessToken = jwt.sign(
//             {
//                 user:{
//                     username:user.username,
//                     email:user.email,
//                     password:user.password
//                 }
//             },process.env.ACCESS_TOKEN,{expiresIn:"10m"}
//     )
//         res.status(200).json({accessToken})
//     }else{
//         res.status(404);
//         throw new Error("email or password is invaild")
//     }

// });

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).render('sign_in',{ emailNotFound: "User not found"});
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
  
        req.session.isAuth = true;
         return res.redirect("/"); 
      } else {
        return res.status(404).render('sign_in',{ wrongPassword: "Wrong password"});
      }
    } catch (error) {
      console.error(error);
      return res.send("Error during login");
    }
  });




  ////logout

const logout = asyncHandler(async  (req,res) => {
  console.log("before destroying session",req.sessionID);
  req.session.destroy((error) => {
    if(error){
      console.error(error);
      res.status(500).json({message:"Server error"});
    }else{
      console.log("after destroying session ", req.sessionID);
      res.clearCookie("connect.sid");
      res.redirect("/sign_in");
    }
  })
})



//@descr currentuser
//@route post/api/currentuser
//@access  private
const  currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports={registerUser,loginUser,currentUser,otpVerify,logout}

