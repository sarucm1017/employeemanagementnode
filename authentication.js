const session = require("express-session");

const sessionMid = session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 60 * 60 * 1000,
        httpOnly: true, // Prevents client-side access to cookies
        sameSite: 'strict' // only allowing cookies from the same origin
    },
});

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        return next();
    }else{
        return res.redirect("/sign_in");
    }
};


module.exports = { isAuth, sessionMid };