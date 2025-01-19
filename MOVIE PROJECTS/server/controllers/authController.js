const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const express = require("express")
var cookieParser = require('cookie-parser')
const userModel = require("../models/user")


var app = express()
app.use(cookieParser())

const signup = async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).send({ message: "Please fill in all fields" })
    }
    try {
        const isuserExist = await userModel.findOne({ email })
        if (isuserExist) {
            return res.status(400).send({ message: "Email already exist" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send({ message: 'error to hash password' })
            }
            await userModel.create({ name, email, password: hash, role })
            res.status(200).send({ message: "user created successfully" })
        })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" })
    }
    const isExistUser = await userModel.findOne({ email })
    if (!isExistUser) {
        return res.status(200).json({ message: "Please signup first" })
    }

    bcrypt.compare(password, isExistUser.password, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Error in Comparing Password" })
        }
        if (result) {
            const { password, ...rest } = isExistUser._doc
            jwt.sign({ userId: rest }, process.env.PrivateKey, function (err, token) {
                if (err) {
                    return res.status(400).json({ message: "Error in creating token" })
                }
                res.cookie("varificationToken", token)
                    .status(200).json({ message: "User Login Succeessfully", userData: rest })

            })
        }
        else {
            return res(400).json({ message: "Incorect password" })
        }
    })

}

module.exports = { signup, signin }