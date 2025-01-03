import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Notes from "./pages/Notes";
import NotesDetails from "./pages/NotesDetails";
import NotesCeate from "./pages/NotesCeate";
import UpdatePost from "./pages/UpdatePost";
import Login from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes"
import GetAllNotesByAdmin from "./pages/GetAllNotesByAdmin";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/signin" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/notes" element={

        <Notes />

      }>
      </Route>
      <Route path="/notes/getsinglenotes/:Id" element={

        <NotesDetails />

      }>
      </Route>
      <Route path="/notes/update/:Id" element={

        <UpdatePost />

      }>
      </Route>
      <Route path="/notes/create" element={

        <NotesCeate />

      }>
      </Route>
      <Route path="/getallnotes" element={<GetAllNotesByAdmin />}></Route>
    </Routes>
  );
};

export default Allroutes;