const express = require("express");
const bodyparser =require( "body-parser") ; 
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const { sessionMid } = require("./authentication");
const cookieParser=require("cookie-parser");
const path =  require("path");
const morgan = require("morgan");

connectDB();
const app =  express();
const port =process.env.PORT|| 2000;


app.use(express.json());

//middleware
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(sessionMid);
app.use(express.static("public"));
app.use(express.static(path.join()));

// Serve uploaded files
app.use("/uploads",express.static(path.resolve(__dirname, 'uploads')));



// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//route setup

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/users", require("./routes/userRoutes"))
app.use("/",require("./routes/viewRoute"));



app.use(errorHandler);
//start

app.listen(port, () =>{
    console.log( `Server is running on http://localhost:${port}`);
})
