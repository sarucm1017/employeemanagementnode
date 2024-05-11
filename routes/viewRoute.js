const express = require("express");
const  router = express.Router();
const viewController = require("../controller/viewController");
const {isAuth} = require("../authentication");

router.get("/", isAuth ,viewController.renderindex);

router.get("/employeedetails",isAuth,viewController.renderemployeedetails);

router.get("/sign_in",viewController.rendersignin);

router.get("/otpVerification",viewController.renderotpverification);

router.get("/sign_up",viewController.rendersignup);



module.exports=router;