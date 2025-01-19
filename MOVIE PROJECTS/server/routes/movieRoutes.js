const express = require("express")
const { createMovie, GetAllMovieByUser, GetSingleMovieByUser, updateMovie, GetAllMoviesByAdmin, DeleteAllMoviesByAdmin, deleteMovie } = require("../controllers/movieController")
const authMiddleware = require("../middleware/authMiddleware")
const app = express()


const moviesRouter = express.Router()

moviesRouter.post("/create", authMiddleware, createMovie)

// delete notes
moviesRouter.delete("/delete/:moviesId", authMiddleware, deleteMovie)

// Get ALl notes of user
moviesRouter.get("/getallmovies/:userId", authMiddleware, GetAllMovieByUser)

// single notes by user
moviesRouter.get("/getsinglemovie/:moviesId", authMiddleware, GetSingleMovieByUser)

// update note
moviesRouter.patch("/updatemovie/:moviesId", authMiddleware, updateMovie)

// get all notes by admin
moviesRouter.get("/getallsmovies", GetAllMoviesByAdmin)

// get deleted by admin
moviesRouter.delete("/deletallmovies", DeleteAllMoviesByAdmin)

module.exports = moviesRouter