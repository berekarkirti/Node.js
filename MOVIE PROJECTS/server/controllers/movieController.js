const movieModel = require("../models/movie");

// Create a movie
const createMovie = async (req, res) => {
    const { Title, Genre, Director, Description, ReleaseYear } = req.body;

    if (!Title || !Genre || !Director || !Description || !ReleaseYear) {
        return res.status(400).json({ message: "All fields are required to create a movie" });
    }

    try {
        await movieModel.create({
            Title,
            Genre,
            Director,
            Description,
            ReleaseYear,
            userId: req.user._id
        });
        res.status(200).json({ message: "Movie created successfully" });
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).json({ message: "An error occurred while creating the movie" });
    }
};

// Delete a movie
const deleteMovie = async (req, res) => {
    const { moviesId } = req.params;

    try {
        const movie = await movieModel.findById(moviesId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You cannot delete this movie" });
        }

        await movieModel.findByIdAndDelete(moviesId);
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ message: "An error occurred while deleting the movie" });
    }
};

// Get all movies for a user
const GetAllMovieByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access to movies" });
        }

        const movies = await movieModel.find({ userId });

        if (!movies.length) {
            return res.status(404).json({ message: "No movies found" });
        }

        res.status(200).json({ movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "An error occurred while fetching movies" });
    }
};

// Get a single movie for a user
const GetSingleMovieByUser = async (req, res) => {
    const { moviesId } = req.params;

    try {
        const movie = await movieModel.findById(moviesId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You cannot view this movie" });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ message: "An error occurred while fetching the movie" });
    }
};

// Update a movie
const updateMovie = async (req, res) => {
    const { moviesId } = req.params; // Use the correct parameter name

    try {
        const movie = await movieModel.findById(moviesId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You cannot update this movie" });
        }

        await movieModel.findByIdAndUpdate(moviesId, { ...req.body }, { new: true }); // Ensure updated movie is returned
        res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ message: "An error occurred while updating the movie" });
    }
};

// Get all movies (Admin)
const GetAllMoviesByAdmin = async (req, res) => {
    try {
        const movies = await movieModel.find();

        if (!movies.length) {
            return res.status(404).json({ message: "No movies found" });
        }

        res.status(200).json({ movies });
    } catch (error) {
        console.error("Error fetching movies for admin:", error);
        res.status(500).json({ message: "An error occurred while fetching movies" });
    }
};

// Delete all movies (Admin)
const DeleteAllMoviesByAdmin = async (req, res) => {
    try {
        await movieModel.deleteMany({});
        res.status(200).json({ message: "All movies deleted successfully" });
    } catch (error) {
        console.error("Error deleting all movies:", error);
        res.status(500).json({ message: "An error occurred while deleting movies" });
    }
};

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    GetAllMovieByUser,
    GetSingleMovieByUser,
    GetAllMoviesByAdmin,
    DeleteAllMoviesByAdmin,
};
