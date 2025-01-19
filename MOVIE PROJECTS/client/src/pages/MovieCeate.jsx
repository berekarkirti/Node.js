import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/NotesCeate.css";

const NotesCreate = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let movieData = {
      Title: title,
      Genre: genre,
      Director: director,
      Description: description,
      ReleaseYear: releaseYear,
    };

    axios
      .post(`${import.meta.env.VITE_BASEURL}/movies/create`, movieData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Movie Created Successfully");
        setTitle("");
        setGenre("");
        setDirector("");
        setDescription("");
        setReleaseYear("");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Error Occurred");
      });
  };

  return (
    <div className="kirti">
      <div
        id="kirti2"
        className="container p-5 max-w-3xl mx-auto mt-5 mb-5"
        style={{ maxWidth: "30%", border: "2.5px solid teal", borderRadius: "8px" }}
      >
        <h1 className="text-center my-4">Create a Movie</h1>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Form.Group className="d-flex flex-wrap gap-3">
            <Form.Control
              type="text"
              placeholder="Enter Movie Title"
              className="flex-fill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Enter Genre"
              className="flex-fill"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="d-flex flex-wrap gap-3">
            <Form.Control
              type="text"
              placeholder="Enter Director"
              className="flex-fill"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Enter Description"
              className="flex-fill"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="d-flex flex-wrap gap-3">
            <Form.Control
              type="text"
              placeholder="Enter Release Year"
              className="flex-fill"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Publish
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NotesCreate;
