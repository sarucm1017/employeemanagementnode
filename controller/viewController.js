const path = require("path");

exports.renderindex = (req,res) => {
    res.render("index");
}

exports.renderemployeedetails = (req,res) => {
    res.render("employeedetails");
}
exports.rendersignin = (req,res) => {
    res.render("sign_in");
}
exports.rendersignup = (req,res) => {
    res.render("sign_up");
}
exports.renderotpverification = (req,res) => {
    res.render("otpVerification");
}