import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    Title: '',
    Author: '',
    Price: 0,
    Description: '',
    ISBN: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/books/singledata/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch(`http://localhost:8081/books/update/${id}`, book)
      .then((res) => {
        console.log(res.data);
        alert('Book updated successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
            
    <h3>Book Edit</h3>

    <label>Book Title:</label>
    <input type="text" name="Title"  value={book.Title}  onChange={handleChange} />

    <label>Author:</label>
    <input type="text" name="Author"  value={book.Author}  onChange={handleChange} />

    <label>Price:</label>
    <input type="number" name="Price" value={book.Price} onChange={handleChange} />

    <label>Description</label>
    <textarea name="Description" value={book.Description} onChange={handleChange} />

    <button type="submit">Edit Book</button>

</form>
  );
};

export default BookUpdate;