const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, {
    timestamps: true,
    versionKey: false
}
)

const userModel = mongoose.model("users", userSchema)

module.exports = userModel