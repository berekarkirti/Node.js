import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/BookDetails.css";

const BookDetails = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    const BookDetails = async () => {
      try 
      {
        const response = await axios.get(`http://localhost:8081/books/singledata/${bookId}`);
        setBook(response.data);
      } 
      catch (err) 
      {
        setError("Failed to load book details.");
      } 
      finally {
        setLoading(false);
      }
    };

    BookDetails();
  }, [bookId]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id="details">
      {book ? (
        <li className="details">
          <p className="Title">Title: {book.Title}</p>
          <p className="Author">Author: {book.Author}</p>
          <p className="Price">Price: {book.Price}</p>
          <p className="description">{book.Description}</p>
        </li>
      ) : (
        <p>No book details available.</p>
      )}
    </div>
  );
};

export default BookDetails;
