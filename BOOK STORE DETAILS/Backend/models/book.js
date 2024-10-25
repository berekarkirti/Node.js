const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Price: Number,
    Description: String,
    ISBN: { type: String, unique: true }
});

const bookModel = mongoose.model("books", bookSchema)

module.exports = bookModel;