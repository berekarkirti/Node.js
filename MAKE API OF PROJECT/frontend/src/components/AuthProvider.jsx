import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedUser = localStorage.getItem("user"); 
  
    if (savedUser) 
    {
      try 
      {
        setUser(JSON.parse(savedUser)); 
      } 
      catch (error) 
      {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); 
        setUser(null); 
      }
    } 
    else 
    {
      setUser(null); 
    }
  
    setLoading(false); 
  }, []);
  

  const login = (userData) => 
  {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };


  const logout = () => 
  {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
