// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import moment from "moment";
// // import "../styles/NotesDetails.css";

// // const MovieDetails = () => {
// //     const [movieData, setMovieData] = useState({});
// //     const { Id } = useParams(); 
// //     console.log(Id);

// //     const getSingleMovie = () => {
// //         axios.get(`${import.meta.env.VITE_BASEURL}/movies/getsinglemovie/${Id}`, {
// //             withCredentials: true,
// //           })
// //             .then((res) => {
// //                 console.log(res.data);
// //                 setMovieData(res.data.movies); 
// //             })
// //             .catch((err) => {
// //                 console.error(err);
// //             });
// //     };

// //     useEffect(() => {
// //         getSingleMovie();
// //     }, [Id]); 

// //     return (
// //         <div className="container-fluid" id="NotesDetails">
// //             <div className="container">
// //                 <div className="row justify-content-center mb-4">
// //                     <div className="col-md-8">
// //                         <div className="text-center">
// //                             <img
// //                                 src={movieData.notesImage}
// //                                 alt="Movie Title"
// //                                 className="img-fluid rounded mb-3"
// //                                 height={600}
// //                                 width={600}
// //                             />
// //                             <h2>{movieData.title}</h2>
// //                             <p className="text-muted small">
// //                                 {moment(movieData.createdAt).fromNow()}
// //                             </p>
// //                             <div className="movie-content">{movieData.description}</div> 
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MovieDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import moment from 'moment';
// import '../styles/NotesDetails.css';

// const MovieDetails = () => {
//   const [movieData, setMovieData] = useState({});
//   const { Id } = useParams(); 
//   console.log(Id);

//   const getSingleMovie = () => {
//     axios
//       .get(`${import.meta.env.VITE_BASEURL}/movies/getsinglemovie/${Id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res.data);
//         setMovieData(res.data.movie); 
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     getSingleMovie();
//   }, [Id]); 


//   return (
//     <div className="container-fluid" id="NotesDetails">
//       <div className="container">
//         <div className="row justify-content-center mb-4">
//           <div className="col-md-8">
//             <div className="text-center">
//               <img
//                 src={"https://img.freepik.com/premium-vector/funny-cute-happy-popcorn-lemonade-ticket-characters-bundle-set_464314-842.jpg"} 
//                 alt="Movie Title"
//                 className="img-fluid rounded mb-3"
//                 height={600}
//                 width={600}
//               />
//               <h2>{movieData.Title}</h2>
//               <p className="text-muted small">
//                 {moment(movieData.createdAt).fromNow()}
//               </p>
//               <div className="movie-content">{movieData.description}</div> 
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import '../styles/NotesDetails.css';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const { Id } = useParams(); 

  // Fetch single movie details from the API
  const getSingleMovie = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/movies/getsinglemovie/${Id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMovieData(res.data.movie); 
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSingleMovie();
  }, [Id]); 

  return (
    <div className="container-fluid" id="NotesDetails">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="text-center">
              <img
                src={"https://img.freepik.com/premium-vector/funny-cute-happy-popcorn-lemonade-ticket-characters-bundle-set_464314-842.jpg"} 
                alt="Movie Title"
                className="img-fluid rounded mb-3"
                height={600}
                width={600}
              />
              <h2>{movieData.Title}</h2>
              <p className="text-muted small">
                {moment(movieData.createdAt).fromNow()}
              </p>
              <div className="movie-content">{movieData.description}</div> 

              <div className="movie-details mt-4">
                <p id='subtitles'><strong>Director:</strong> {movieData.Director}</p>
                <p id='subtitles'><strong>Genre:</strong> {movieData.Genre}</p>
                <p id='subtitles'><strong>Release Year:</strong> {movieData.ReleaseYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

