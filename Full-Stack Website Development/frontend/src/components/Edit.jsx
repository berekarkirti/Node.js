import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Edit.css'; 

const initialstate = {
    username: "",
    password: "",
    location: "",
    dob: "",
    role: ""
};

const Edit = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState(initialstate);
  const navigate = useNavigate(); 

  const getsingledata = () => {
    axios.get(`http://localhost:8080/user/users/${id}`)
      .then((res) => {
        setFormData(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8080/user/update/${id}`, formData,{
        withCredentials:true
    })
      .then((res) => {
        alert("User updated successfully");
        console.log(res.data);
        navigate('/user');
      })
      .catch((err) => {
        alert("Error updating user:");
        console.log(err);
      });
  };

  const { username, password, location, dob, role } = formData;

  useEffect(() => {
    getsingledata();
  }, []); 

  return (
    <div className="edit-container">
      <div className="container mt-5">
        <form onSubmit={handlesubmit} className="edit-user-form">
          <h2>Edit User</h2>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handlechange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlechange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location:</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handlechange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handlechange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role:</label>
            <select
              name="role"
              value={role}
              onChange={handlechange}
              required
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};



export default Edit;
