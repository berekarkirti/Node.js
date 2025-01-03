import React from 'react';
import "../styles/BlogDetails.css"

const BlogDetails = ({ blog }) => (
  <div>
    <h1>{blog.title}</h1>
    <p>Author: {blog.author}</p>
    <p>{blog.content}</p>
    <p>Tags: {blog.tags.join(', ')}</p>
  </div>
);

export default BlogDetails;
