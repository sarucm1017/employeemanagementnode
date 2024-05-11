const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :{
        type:String,
        require:[true,"please add the username"]
    },
    email:{
        type:String,
        require:[true,"please add the emailid"],
        unique:[true,"email id already exits"]
    },
    password:{
        type:String,
        require:[true,"please add the password"]
    }
},
{
    timeStamps:true
}
)

module.exports = mongoose.model('User',userSchema);