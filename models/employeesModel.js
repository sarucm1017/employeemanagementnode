const mongoose = require("mongoose");

const employeeSchema =  mongoose.Schema({
 
    salutation:{type:String, required:[true,"please add the salutation"]},
    firstName:{type:String, required:[true,"please add the firstname"]},
    lastName:{type:String, required:[true,"please add the lastname"]},
    email:{type:String, required:[true,"please add the email"]},
    phone:{type:String, required:[true,"please add the phonenumber"]},
    dob:{type:String, required:[true,"please add the date of birth"]},
    qualifications:{type:String, required:[true,"please add the qualification"]},
    gender:{type:String, required:[true,"please add the gender"]},
    address:{type:String, required:[true,"please add the address"]},
    country:{type:String, required:[true,"please add the country"]},
    state:{type:String, required:[true,"please add the state"]},
    city:{type:String, required:[true,"please add the city"]},
    pin:{type:String, required:[true,"please add the pin"]},
    username:{type:String, required:[true,"please add the username"]},
    password:{type:String, required:[true,"please add the password"]},
    image: {
      type: String,
      required: [true, "please add the image"],
    },
},
{
    timestamps: true 
}
);

module.exports = mongoose.model( "Employee",employeeSchema) ;



