const mongoose=require("mongoose")
const blogSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Content: String,
    Tag: [String],
    PublishedDate: Date,
    id: {type: String,unique: true}
}, {
    versionKey: false,
    timestamps: true
});


const blogModel=mongoose.model("blog",blogSchema)

module.exports=blogModel