import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/BlogList.css";
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogdata, setBlogdata] = useState([])

  const getNotes = () => {
    axios.get(`${import.meta.env.VITE_BASEURL}/blogs/getblog`)
      .then((res) => {
        // console.log(res.data);
        setBlogdata(res.data)  
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getNotes()
  }, [])


  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`${import.meta.env.VITE_BASEURL}/blogs/deleteblog/${id}`) 
      .then((res) => {
        console.log(res)
        alert("Data deleted successfully")
        getNotes()  
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='d-flex flex-wrap gap-4'>
        {
          blogdata.length > 0 ? (blogdata.map((el) => (
            <div key={el._id}>
              <p>{el._id}</p>
              <h4>{el.Title}</h4>
              <h6>{el.Author}</h6> 
              <p>{el.Content}</p>
              <button ><Link to={`/patch/${el._id}`} className="edit">Edit</Link></button>
              <button onClick={() => handleDelete(el._id)}className="delete">Delete</button>
            </div>
          ))) : ("No blogs available") 
        }
      </div>
    </div>
  )
}

export default BlogList
