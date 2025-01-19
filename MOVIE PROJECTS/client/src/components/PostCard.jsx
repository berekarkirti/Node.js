// import React from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "../styles/PostCard.css";

// const PostCard = ({ title, image, id, getAllUserNotes }) => {
//   const handleDelete = () => {
//     axios
//       .delete(`${import.meta.env.VITE_BASEURL}/movies/delete/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         getAllUserNotes();
//         toast.success(res?.data?.message || "Delete notes successfully!");
//       })
//       .catch((error) => {
//         console.error("Error deleting note:", error);
//         toast.error("Error in deleting notes");
//       });
//   };

//   return (
//     <div className="card shadow-sm h-100">
//       <Link to={`/movies/getsinglemovie/${id}`}>
//         <img
//           src={image || "https://img.freepik.com/premium-vector/funny-cute-happy-popcorn-lemonade-ticket-characters-bundle-set_464314-842.jpg"}
//           alt="post cover"
//           className="card-img-top img-fluid"
//           height={260}
//           style={{ objectFit: "cover" }}
//         />
//       </Link>
//       <div className="card-body">
//         <div className="card-title text-center">
//           <p>{itle}</p>
//         </div>
//       </div>
//       <div className="d-flex justify-content-center mb-3">
//         <button className="btn">
//           <Link to={`/movies/updatemovie/${id}`} className="btn">
//             Edit
//           </Link>
//         </button>
//         <button className="btn ms-2" onClick={handleDelete}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/PostCard.css";

const PostCard = ({ title, image, id, getAllUserNotes }) => {
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/movies/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        getAllUserNotes();
        toast.success(res?.data?.message || "Delete notes successfully!");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        toast.error("Error in deleting notes");
      });
  };

  return (
    <div className="card shadow-sm h-100">
      <Link to={`/movies/getsinglemovie/${id}`}>
        <img
          src={image || "https://img.freepik.com/premium-vector/funny-cute-happy-popcorn-lemonade-ticket-characters-bundle-set_464314-842.jpg"}
          alt="post cover"
          className="card-img-top img-fluid"
          height={260}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="card-body">
        <div className="card-title text-center">
          <p>{title || "Movie"}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn">
          <Link to={`/movies/updatemovie/${id}`} className="btn">
            Edit
          </Link>
        </button>
        <button className="btn ms-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;

