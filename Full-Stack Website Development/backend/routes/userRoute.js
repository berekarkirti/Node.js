const express = require("express");
const { Signup, Login, Update, getAlluser, getParticularuser, deleteUser } = require("../controllers/userController");
const isAuth = require("../middleware/Auth");
const validator = require("../middleware/Validator");
const UserLogger = require("../middleware/UserLogger");
const userRouter = express.Router();

//--------------------------Singup--------------------------
userRouter.post("/signup", UserLogger, Signup)

//--------------------------Login--------------------------
userRouter.post("/login", UserLogger,  Login)

//--------------------------Get All User--------------------------
userRouter.get("/allusers", getAlluser)

//--------------------------Get Particular User--------------------------
userRouter.get("/users/:_id", getParticularuser)

//--------------------------Update--------------------------
userRouter.patch("/update/:_id", isAuth, validator, Update)

//--------------------------Delete--------------------------
userRouter.delete("/deleteuser/:_id", isAuth, validator,deleteUser)

module.exports = userRouter;