import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetails from './components/BlogDetails';
import BlogEdit from './components/BlogEdit';


const AllRoutes = () => {
  return (

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/post/:id" element={<BlogDetails />} />
          <Route path="/patch/:id" element={<BlogEdit />} />
        </Routes>
   
  )
}

export default AllRoutes
