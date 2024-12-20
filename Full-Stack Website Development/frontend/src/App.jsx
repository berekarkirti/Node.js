import React from "react";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/Navbar";
import AuthProvider  from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AllRoutes />
    </AuthProvider>
  );
}

export default App;
