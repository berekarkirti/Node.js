const mongoose = require("mongoose")
const movieSchema = new mongoose.Schema({
    Title: String,
    Genre: String,
    Director: String,
    Description: String,
    ReleaseYear: Number,

    userId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
)

const movieModel = mongoose.model("movies", movieSchema)

module.exports = movieModel