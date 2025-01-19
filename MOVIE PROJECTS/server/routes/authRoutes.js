const express = require("express")
const { signup, signin } = require("../controllers/authController")

const authRoutes = express.Router()

// sinup route
authRoutes.post("/signup", signup)

// signin route
authRoutes.post("/signin", signin)

module.exports = authRoutes