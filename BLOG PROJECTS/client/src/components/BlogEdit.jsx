import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/BlogEdit.css";

const BlogEdit = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Tag: "",
    Content: "",
    PublishedDate: "",
  });


  const getSingleData = () => 
  {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/blogs/getsingleblog/${id}`)

      .then((res) =>
      {
        setFormData(res.data); 
      })
      .catch((err) => 
      {
        console.error("Error fetching blog data:", err);
      });
  };

  useEffect(() => 
  {
    getSingleData();
  }, []);


  const handleChange = (e) => 
  {
    const { name, value } = e.target;
    setFormData
    ({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => 
  {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_BASEURL}/blogs/patchblog/${id}`, formData)
      .then((res) => 
      {
        alert("Blog updated successfully!");
      })
      .catch((err) => 
      {
        console.error("Error updating blog:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "5% 36%",border:"4px solid gray" }} id="#kirti">
      <h2>Edit Your Blog</h2>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>

          <label htmlFor="Title" style={{ display: "block", marginBottom: "5px" }}>
            Title
          </label>

          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />

        </div>

        <div style={{ marginBottom: "10px" }}>

          <label htmlFor="Author" style={{ display: "block", marginBottom: "5px" }}>
            Author
          </label>

          <input
            type="text"
            id="Author"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />

        </div>

        <div style={{ marginBottom: "10px" }}>

          <label htmlFor="Content" style={{ display: "block", marginBottom: "5px" }}>
            Content
          </label>
          
          <textarea
            id="Content"
            name="Content"
            value={formData.Content}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="Tag" style={{ display: "block", marginBottom: "5px" }}>
            Tag
          </label>
          <textarea
            id="Tag"
            name="Tag"
            value={formData.Tag}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="PublishedDate" style={{ display: "block", marginBottom: "5px" }}>
            Published Date
          </label>
          <input
            type="date"
            id="PublishedDate"
            name="PublishedDate"
            value={formData.PublishedDate}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default BlogEdit;
