const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const isAuth = (req, res, next) => {

    const { varificationToken } = req.cookies;
    
    // don't have varificationToken:- 
    if (!varificationToken) 
    {
        return res.status(400).json({ message: "Login again" });
    }

    // varificationToken exist:-
    jwt.verify(varificationToken, process.env.privateKey, (err, decoded) => 
    {
        if (err)
        {
            return res.status(400).json({ message: "Invalid Token" });
        }

        req.user = decoded.user;
        next();
    });

};

module.exports = isAuth;