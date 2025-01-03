import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PostCard from "../components/PostCard";

const GetAllNotesByAdmin = () => {
  let userData = null;
  try {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      userData = JSON.parse(storedData).userData;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  const [notes, setNotes] = useState([]);

  const getAllUserNotes = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/getallnotesbyadmin`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("API response:", res.data);
        if (res.data && Array.isArray(res.data.totalNotes)) {
          setNotes(res.data.totalNotes);
          toast.success("Get all notes successfully!");
        } else {
          console.warn("Unexpected API response:", res.data);
          setNotes([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setNotes([]);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  // console.log("Fetched notes:", notes);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <div className="row">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="col-md-6 col-lg-4 mb-4">
                <PostCard
                  title={note.title}
                  body={note.body}
                  id={note._id}
                  image={note.notesImage}
                  getAllUserNotes={getAllUserNotes}
                  userId={userData ? userData._id : null}
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

export default GetAllNotesByAdmin;
