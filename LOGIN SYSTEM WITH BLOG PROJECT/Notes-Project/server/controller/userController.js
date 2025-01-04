const  userModel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const express = require("express")
var cookieParser = require('cookie-parser')
const isAuth = require("../middleware/Auth")

//--------------------------Singup--------------------------
const signup = async (req, res) => {

    const { name, email, password } = req.body;

    // check the role:-
    if (req.body.role) 
    {
        return res.status(400).send({ message: "Role can not sent from req.body" })
    }
    
    // check all fields are fill or not:-
    if (!name || !email || !password) 
    {
        return res.status(400).send({ message: "Please fill in all fields" })
    }
    
    // email is already exist or not:-
    try 
    {
        const isuserExist = await userModel.findOne({ email })

        if (isuserExist) 
        {
            return res.status(400).send({ message: "Email already exist" })
        }

        //password hashing:-
        bcrypt.hash(password, 5, async (err, hash) => 
        {
            // Store hash in your password DB.
            if (err) 
            {
                return res.status(500).send({ message: 'error to hash password' })
            }

            //created account:-
            await userModel.create({ name, email, password: hash })
            res.status(200).send({ message: "user created successfully" })
        });
        
    } 
    catch (error) 
    {
        res.status(400).send({ message: error });
    }
};

//--------------------------Singin--------------------------
const signin = async (req, res) => {

    const { email, password } = req.body;

    //check all fields are fill or not:-
    if (!email || !password) 
    {
        return res.status(400).json({ message: "Please fill in all fields" })
    }

    //email is already exist or not:-
    const isExistUser = await userModel.findOne({ email });

    if (!isExistUser) 
    {
        return res.status(200).json({ message: "Please signup first" })
    }

    //compare password:-
    bcrypt.compare(password, isExistUser.password, function (err, result) 
    {
        if (err) 
        {
            return res.status(400).json({ message: "Error in Comparing Password" })
        }

        //token create:-
        if (result) 
        {
            const { password, ...rest } = isExistUser._doc;
            // console.log(isExistUser)

            jwt.sign({ user: rest }, process.env.PrivateKey, function (err, token) 
            {
                if (err) 
                {
                    return res.status(400).json({ message: "Error in creating token" })
                }
                //   console.log(token)
                res.cookie("varificationToken", token)

                .status(200).json({ message: "User Login Succeessfully", userData: rest })
            })
        }
        else 
        {
            return res.status(400).json({ message: "Incorect password" });
        }
    })

};

module.exports = { signup, signin }