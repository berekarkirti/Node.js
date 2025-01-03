import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid m-0 p-0">

        <Link to="/" className="navbar-brand font-weight-bold">
          Blogs
        </Link>

        <Link to="/create" className="navbar-brand font-weight-bold">
          Create Blogs
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center gap-2">



            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s"
                  alt="user"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
              </ul>
            </li>
            <li>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );

}