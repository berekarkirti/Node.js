import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../style/Update.css";

const initialState = {
    title: "",
    description: "",
    image: "",
    price: "",
    category: ""
};

const Update = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(initialState);
    
    const getSingleData = () => {
        axios.get(`http://localhost:8081/product/${id}`)
            .then((res) => {
                setFormData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(()=>{
        getSingleData();
    },[])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8081/updateproduct/${id}`, formData)
            .then((res) => {
                console.log(res.data);
                alert("Product updated successfully");
                getSingleData();
            })
            .catch((err) => {
                alert("Error..!");
                console.log(err);
            });
    };

    const { title, price, description, image, category } = formData;

    return (
        <div className="container ">
            <h1 className="update-product">Edit Product</h1>
            <form className="update-product" onSubmit={(e) => handleSubmit(e)}>
                <div className="form">
                    <label className="update-label">Product Name:</label>
                    <input type="text" name="title" value={title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="update-label">Price:</label>
                    <input type="text" name="price" value={price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="update-label">Category:</label>
                    <input type="text" name="category" value={category} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="update-label">Description:</label>
                    <textarea name="description" value={description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="update-label">Image URL:</label>
                    <input type="text" name="image" value={image} onChange={handleChange} required />
                </div>
                <button type="submit" className="edit">Edit Product</button>
            </form>
        </div>
    );
};

export default Update;
