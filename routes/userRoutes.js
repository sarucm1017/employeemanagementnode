const express = require("express");
const  router = express.Router();
const {registerUser,loginUser,otpVerify,logout} = require("../controller/userController");
// const validateToken = require("../middleware/validateTokenHandler");



router.route("/sign_up").post(registerUser);

router.route("/sign_in").post(loginUser);

router.route('/otpVerification').post(otpVerify);

router.route("/logout").get(logout)




module.exports = router;