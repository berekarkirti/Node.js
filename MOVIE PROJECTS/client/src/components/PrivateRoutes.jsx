import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("userdata"));

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoutes;
