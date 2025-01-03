import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PostCard from "../components/PostCard";


const Notes = () => {
  const {userData} = JSON.parse(localStorage.getItem("userdata"));

  const [notes, setNotes] = useState([]);

  const getAllUserNotes = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/getallnotes/${userData._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setNotes(res.data.allUserNotes);
         toast.success("Get all notes successfully!");

      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <div className="row">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="col-md-6 col-lg-4 mb-4">
                <PostCard
                  title={note.title}
                  body={note.body}
                  id={note._id}
                  image={note.notesImage}
                  getAllUserNotes={getAllUserNotes}
                  userId={userData._id}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No Notes Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
