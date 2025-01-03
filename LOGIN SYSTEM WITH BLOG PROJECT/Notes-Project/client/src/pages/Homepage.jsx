import React from 'react';
import "../styles/Homepage.css";
import Illustration from '../components/Illustration';

const Homepage = () => {
  return (
    <div className="py-md-32 position-relative">
      <div className="container-lg max-w-screen-xl">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-1 ms-auto d-none d-lg-block">
            <div className="mb-5 mb-lg-0 w-11/10 position-relative">

              <Illustration />

              <div className="position-absolute bottom-0 start-72 h-64 w-64 mt-n4 transform translate-y-n1/2 translate-x-n1/2 gradient-bottom-right start-purple-400 end-cyan-500 filter blur-100 rounded-4 p-5"> </div>
            </div>
          </div>
          <div className="col-lg-6 order-md-0">

            <h5 className="h5 mb-5 text-uppercase text-warning mb-5">
              Welcome to Our Blog
            </h5>

            <h1 className="ls-tight font-bolder display-3 mb-5">
              Dive into the latest stories, trends, and tips from industry experts.
            </h1>

            <p className="lead mb-10">
              Accelerate your development while remaining consistent.
            </p>

            <div className="mx-n2">
              <a href="#" id="getbutton" className="btn btn-lg  shadow-sm mx-2 px-lg-8">
                Get started
              </a>
              <a href="#" id="learnbutton" className="btn btn-lg btn-neutral mx-2 px-lg-8">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage