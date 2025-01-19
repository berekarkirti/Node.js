import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MovieCeate from "./pages/MovieCeate";
import UpdatePost from "./pages/UpdatePost";
import Login from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
import GetAllMoviesByAdmin from "./pages/GetAllMoviesByAdmin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/movies/getallmovies/:Id"
        element={<Movies />}
      />
      <Route
        path="/movies/getsinglemovie/:Id"
        element={<MovieDetails />}
      />
      <Route
        path="/movies/updatemovie/:Id"
        element={<UpdatePost />}
      />
      <Route
        path="/movies/create"
        element={<MovieCeate />}
      />
      <Route
        path="/getallsmovies"
        element={<GetAllMoviesByAdmin />}
      />
    </Routes>
  );
};

export default AllRoutes;
