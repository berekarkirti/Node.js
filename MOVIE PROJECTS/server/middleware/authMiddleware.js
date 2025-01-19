const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const authMiddleware = (req, res, next) => {
    const {varificationToken}  = req.cookies;

    if (!varificationToken) {
        return res.status(400).json({ message: "Login again" });
    }

    jwt.verify(varificationToken, process.env.PrivateKey ,function(err, decoded) {
        
           req.user = decoded.userId;
           next();
      });
   
};

module.exports = authMiddleware;