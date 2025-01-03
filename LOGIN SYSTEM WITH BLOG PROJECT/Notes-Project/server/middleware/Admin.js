const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") 
    {
        return res.status(403).send({ message: "Access denied. You are not an admin" })
    }
    next();
}

module.exports = isAdmin;