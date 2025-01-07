const UserModel = require("../model/usermodel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


//--------------------------Singup--------------------------
const Signup = async (req, res) => {

    const { username, email, dob, location, password, confirmPassword } = req.body

    // console.log(req.body)

    // check the role:-
    if (req.body.role) 
    {
        return res.status(400).send({ message: "Role can not sent from req.body" })
    }

    //check all fields are fill or not:-
    if (!username || !email || !dob || !location || !password || !confirmPassword) 
    {
        return res.status(400).send({ message: "Please fill in all fields" });
    }

    //check password & confirmpassword is same or not:-
    if (password !== confirmPassword) 
    {
        return res.status(400).send({ message: "Please make sure the Password and Confirm Password fields match" })
    }

    //email is already exist or not:-
    try 
    {
        const isUserExist = await UserModel.findOne({ email });

        if (isUserExist) 
        {
            return res.status(400).send({ message: "Email already exist" });
        }

        //password hashing:-
        bcrypt.hash(password, 5, async (err, hash) => 
        {
            // Store hash in your password DB.
            if (err) 
            {
                return res.status(500).send({ message: "Error in hasing password" })
            }

            //created account:-
            await UserModel.create({ username, email, dob, location, password: hash, confirmpassword: hash });
            res.status(200).send({ message: "User created successfully" });
        });

    }
    catch (error) 
    {
        res.status(500).send({ message: error.message });
    }
};

//--------------------------Login--------------------------
const Login = async (req, res) => {

    const { email, password } = req.body;

    //check all fields are fill or not:-
    if (!email || !password) 
    {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    //email is already exist or not:-
    const isExistUser = await UserModel.findOne({ email });

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
           // const { password, ...rest } = isExistUser._id;
           const { password, ...rest } = isExistUser.toObject();
            
            jwt.sign({ userId: rest }, process.env.privateKey, function (err, token) 
            {
                if (err) 
                {
                    return res.status(400).json({ message: "Error in creating token" });
                }

                res.cookie("varificationToken", token)

                .status(200).json({ message: "User Login Succeessfully", userData: rest });
            })
        }
        else 
        {
            return res(400).json({ message: "Incorect password" });
        }
    })

};

//--------------------------Get All User--------------------------
const getAlluser = async (req, res) => {

    try 
    {
        const AllUser = await UserModel.find();
        res.status(200).json(AllUser);
    }
    catch (error) 
    {
        res.status(400).json({ message: "Users Not Found !" });
    }
};

//--------------------------Get Particular User--------------------------
const getParticularuser = async (req, res) => {

    const { _id } = req.params;

    try 
    {
        const User = await UserModel.findById(_id);
        res.send(User);
    }
    catch (error) 
    {
        res.status(400).json({ message: "User Not Found !" });
    }
};

//--------------------------Update--------------------------
const Update = async (req, res) => {

    const { _id } = req.params;

    try 
    {
        const User = await UserModel.findByIdAndUpdate(_id, { $set: { ...req.body }});

        if (!User) 
        {
            return res.status(404).json({ message: "User Not Found !" });
        }
        else 
        {
            res.status(200).json({ message: "User Updated Successfully !" })
        }
        
    }
    catch (error) 
    {
        console.log(error)
        res.status(400).json({ message: "Error updating user" });
    }
};

//--------------------------Delete--------------------------
const deleteUser = async (req, res) => {

    const { _id } = req.params;

    try 
    {
        const deleteUserdata = await UserModel.findByIdAndDelete(_id);

        if (!deleteUserdata) 
        {
            return res.status(400).json({ message: "User not deleted !" })
        }
        else 
        {
            res.status(200).json({ message: "User deleted Successfully !" })
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(400).json({ message: "Error for delete user" });
    }
};



module.exports = { Signup, Login, getAlluser, getParticularuser, Update, deleteUser };