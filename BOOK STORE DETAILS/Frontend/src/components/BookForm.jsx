import axios from 'axios';
import React, { useState } from 'react';
import "../styles/BookForm.css";

const BookForm = () => {
    const [book, setBook] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8081/books/create", book)
            .then(res => {
                console.log(res.data);
                alert("Book Added ");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>

            <h3>Book Add</h3>

            <label>Book Title:</label>
            <input type="text" name="Title" onChange={handleChange} />

            <label>Author:</label>
            <input type="text" name="Author" onChange={handleChange} />

            <label>Price:</label>
            <input type="number" name="Price" onChange={handleChange} />

            <label>Description</label>
            <textarea name="Description" onChange={handleChange} />

            <label>ISBN:</label>
            <input type="text" name="ISBN" onChange={handleChange} />


            <button type="submit">Add Book</button>

        </form>
    )
}

export default BookForm;
