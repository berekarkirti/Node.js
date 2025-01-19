import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import "../styles/SignIn.css"


const Signin = () => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
     e.preventDefault();
     let userdata={email,password}
  
     axios.post(`${import.meta.env.VITE_BASEURL}/user/signin`,userdata,{withCredentials:true})
     .then((res)=>
      {
        localStorage.setItem("userdata",JSON.stringify(res.data));
        toast.success("login successfull ")
        navigate("/");
      })
      .catch((err)=>{ 
       console.log(err);
       toast.error("please try again");
      })
    
  };

  return (
    <div className="signin-container">
      <div className="container-signin mt-3">
        <form onSubmit={handleSubmit}>
          
          <h2>Login</h2>
        
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

export default Signin;