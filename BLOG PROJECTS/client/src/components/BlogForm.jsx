import axios from 'axios';
import React, { useState } from 'react';
import "../styles/BlogForm.css";

const BlogForm = () => {
  const [blogData, setblogData] = useState({
    Title: '',
    Author: '',
    Tag: '',
    Content: '',
    PublishedDate: ''
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setblogData({
      ...blogData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', blogData);


    axios.post(`${import.meta.env.VITE_BASEURL}/blogs/postblog`, blogData)
      .then((res) => {
        console.log(res);
        alert(res.data.message); 
        
        setblogData({
          Title: '',
          Author: '',
          Tag: '',
          Content: '',
          PublishedDate: ''
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again.");
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '5% 36%',border:"4px solid gray"  }}>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="Title" style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={blogData.Title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="Author" style={{ display: 'block', marginBottom: '5px' }}>Author</label>
          <input
            type="text"
            id="Author"
            name="Author"
            value={blogData.Author}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="Content" style={{ display: 'block', marginBottom: '5px' }}>Content</label>
          <textarea
            id="Content"
            name="Content"
            value={blogData.Content}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="Tag" style={{ display: 'block', marginBottom: '5px' }}>Tag</label>
          <textarea
            id="Tag"
            name="Tag"
            value={blogData.Tag}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="PublishedDate" style={{ display: 'block', marginBottom: '5px' }}>Published Date</label>
          <input
            type="date"
            id="PublishedDate"
            name="PublishedDate"
            value={blogData.PublishedDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
