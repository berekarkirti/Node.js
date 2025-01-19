import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

export default function Navbar() {
  const dataFromLS = JSON.parse(localStorage.getItem("userdata")) || {};
  const userData = dataFromLS?.userData || {};
  const { name, role } = userData;

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/movies/deletallmovies`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        alert("All notes have been deleted!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting notes.");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">
          Home
        </Link>
        <Link to="/movies/create" className="navbar-brand font-weight-bold">
          Create Movie
        </Link>
        <Link to={`/movies/getallmovies/${userData?._id}`} className="navbar-brand font-weight-bold">
          All Movies
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
            {name ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text">Hello, {name}</span>
                </li>
                {role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link to="/getallsmovies" className="btn btn-outline-primary">
                        Get All Movies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-outline-danger "
                        id="deletehu"
                        onClick={handleDelete}
                      >
                        Delete All Movies
                      </button>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link to="/signout" className="btn btn-outline-primary">
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/signin" className="btn btn-outline-primary">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
