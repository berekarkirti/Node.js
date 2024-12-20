import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Signup from './Signup';
import Login from './Login';
import Users from './Users';
import PrivateRoutes from './PrivateRoute';
import Edit from './Edit';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoutes>
          <Home />
        </PrivateRoutes>
      } />
      <Route path="/about" element={
        <PrivateRoutes>
          <About />
        </PrivateRoutes>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={
        <PrivateRoutes>
          <Users />
        </PrivateRoutes>
      } />
      <Route path="/edit/:id" element={
        <PrivateRoutes>
          <Edit />
        </PrivateRoutes>
      } />
    </Routes>
  );
}

export default AllRoutes;
