import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PostCard from "../components/PostCard";

const Movies = () => {
  const storedUserData = localStorage.getItem("userdata");
  const parsedData = storedUserData ? JSON.parse(storedUserData) : null;
  const userData = parsedData?.userData || null;

  const [notes, setNotes] = useState([]);

  const getAllUserNotes = () => {
    if (!userData) {
      toast.error("User not logged in.");
      return;
    }

    axios
      .get(
        `${import.meta.env.VITE_BASEURL}/movies/getallmovies/${userData._id}`,
        {
          headers: { varificationToken: localStorage.getItem("token") },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data); 
        setNotes(res.data.movies || []); 
        toast.success("Fetched all notes successfully!");
      })
      .catch((err) => {
        // console.error("Error fetching notes:", err);
        setNotes([]); 
        toast.error("Failed to fetch notes");
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  useEffect(() => {
    // console.log("Updated notes:", notes); 
  }, [notes]);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <div className="row">
          {notes.length > 0 ? (
            notes.map((note) => {
              // console.log("Rendering note:", note); 
              return (
                <div key={note._id} className="col-md-6 col-lg-4 mb-4">
                  <PostCard
                    title={note.title}
                    body={note.body}
                    id={note._id}
                    image={note.notesImage}
                    getAllUserNotes={getAllUserNotes}
                    userId={userData?._id}
                  />
                </div>
              );
            })
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

export default Movies;

