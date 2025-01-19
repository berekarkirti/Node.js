import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }} 
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-body" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};

export default Footer