import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="container mt-5">
        <h1>🚀 About This Project</h1>
        <p>This project is a full-stack website with authentication and role-based authorization.</p>
        <ul>
          <li>🪐<b>Home Page:</b> A welcoming interface for users.</li>
          <li>🪐<b>About Page:</b> Details about the project and features.</li>
          <li>🪐<b>Sign Up Page:</b> Register as an admin or explorer.</li>
          <li>🪐<b>Login Page:</b> Authenticate yourself and gain access.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
