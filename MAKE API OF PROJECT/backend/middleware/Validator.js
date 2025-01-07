const validator = (req, res, next) => {
   
        if (!req.user) 
        {
            return res.status(401).send({ message: "Unauthorized" });
        }
        
        if (req.user.role !== "Admin") 
        {
            return res.status(403).send({ message: "You don't have the required permissions" });
        }

        next(); 

};

module.exports = validator;
