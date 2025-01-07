import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const [username,setUsername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
     e.preventDefault();
     let userdata={username,email,password}
     login(userdata);

     axios.post("http://localhost:8080/user/login",userdata,{withCredentials:true})
     .then((res)=>
      {
       navigate("/");
      })
      .catch((err)=>{
       console.log(err);
      })
    
  };

  return (
    <div className="login-container">
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          
          <h2>Login</h2>
        
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" name="email" value={email}  onChange={(e) => setemail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
          </div>
          
          <button type="submit" className="btn ">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
