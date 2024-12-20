import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; 
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav className="navbar bg-primary p-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          MyWebsite
        </Link>
        <ul className="navbar-nav d-flex flex-row align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">
              Users
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-row align-items-center">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="navbar-text text-white">Hello, {user.username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm ms-2" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
