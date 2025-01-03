import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

export default function Navbar() {
  const dataFromLS = JSON.parse(localStorage.getItem("userdata")) || {};
  const userData = dataFromLS?.userData || {};
  const { name } = userData;

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/notes/deleteallnotesbyadmin`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">
          Home
        </Link>

        <Link to="/notes" className="navbar-brand font-weight-bold">
          Notes
        </Link>

        <Link to="/notes/create" className="navbar-brand font-weight-bold">
          Create Notes
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
          <div className="d-flex ms-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>

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
                <li className="dropdown-header">
                  {name ? `Hello, ${name}` : "Welcome!"}
                </li>
                <li>
                  <Link to="/dashboard?tab=profile" >
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

              </ul>
            </li>

            {!name ? (
              <li className="nav-item">
                <Link to="/signin" className="btn btn-outline-primary">
                  Sign In
                </Link>
              </li>
            ) : (
              <ul className="conditional">
                <li className="nav-item">
                  <span className="navbar-text">Hello, {name}</span>
                </li>
                 {!name ? (
                  <li>
                  <Link to="/signin" className="btn btn-outline-primary" id="nav-sign">
                  Sign In
                </Link>
                </li>
                 ) : <li>
                 <Link to="/signout" className="btn btn-outline-primary" id="nav-sign">
                 Sign out
               </Link>
               </li>}
              </ul>
            )}

            {userData?.role == "admin" && <li className="nav-item">
              <button className="btn btn-outline-primary"><Link to="/getallnotes" >
                GetAllNotes
              </Link></button>
            </li>}

            {userData?.role == "admin" && <li className="nav-item">
              <button className="btn btn-outline-primary bg-white" onClick={handleDelete}>
                DeleteAllNotes
              </button>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
