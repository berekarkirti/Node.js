const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmpassword: String,
    location: String,
    dob: Date,
    role: {
        type: String,
        default:"user"
      
    }
}, 
{
    timestamps: true,
    versionKey: false
}
)

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel



