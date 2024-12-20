import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role,setRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) 
    {
      alert('Passwords do not match');
      return;
    }
    const formData = { username, email, dob, location, password, role ,confirmPassword};

    axios
      .post('http://localhost:8080/user/signup', formData)
      .then((res) => {
        alert('User registered successfully');
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred during registration');
      });
  };

  return (
    <div className="signup-container">
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value) } required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value ) } required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" value={dob} onChange={(e) => setDob( e.target.value ) } required />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={location} onChange={(e) => setLocation(e.target.value ) } required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" name="role" value={role} onChange={(e) => setRole(e.target.value ) } required >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value ) } required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value ) } required />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
