import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import Update from './components/Update';
import NotFound from './components/NotFound';
import Add from './components/Add';


const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Tasks />} />
    <Route path="/update/:id" element={<Update />} />
    <Route path="/addproduct" element={<Add />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
};

export default AllRoutes;