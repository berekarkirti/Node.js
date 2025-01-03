const express=require("express")
const { signup, signin } = require("../controller/userController")
// const isAuth = require("../middleware/Auth")
const userRouter=express.Router()

// sinup route
userRouter.post("/signup",signup)

// signin route
userRouter.post("/signin",signin)

module.exports=userRouter