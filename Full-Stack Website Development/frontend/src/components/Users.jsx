import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/User.css";
import profileImage from "../assets/download.jpeg"; 

const Users = () => {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios.get('http://localhost:8080/user/allusers')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleDelete = (_id) => {
  
    axios.delete(`http://localhost:8080/user/deleteuser/${_id}`,{
      withCredentials: true,
    })
      .then((response) => {
        alert("User deleted successfully!");
        getData(); 
      })
      .catch((err) => {
        console.error("Error deleting user:", err.response || err.message);
      });
  };
  
  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="user-cards-container">
      <h2>User List :</h2>
      <hr />
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="profile-img">
              <img src={profileImage} alt="Profile" className="image-fluid" />
            </div>
            <h2>{user.name}</h2>
            <p><b>Id:</b> {user._id}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Location:</b> {user.location}</p>
            <div className="user-actions">
              <button>
                <Link to={`/edit/${user._id}`} className="link">Edit</Link>
              </button>
              <button onClick={(e) => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
