import { Alert, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Signup.css"

export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    axios
      .post(`${import.meta.env.VITE_BASEURL}/user/signup`, userData, { withCredentials: true })
      .then((res) => {
        // console.log(res)
        toast.success("Signed in successfully!");
        navigate("/signin")
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again.");
      })
  };

  return (
    <section className="SignUp-section"style={{ backgroundColor: "linear-gradient(135deg, #8e44ad, #1abc9c)", minHeight: "100vh" }}>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card text-black" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <h2 className="text-center fw-bold mb-3">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label type="text" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label type="email" className="form-label">
                          Your email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label type="password" className="form-label">
                          Your Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <p>
                          Already have an account?{" "}
                          <Link to="/signin">Login</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5 d-flex align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}