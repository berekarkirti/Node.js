import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Tasks.css";

const Tasks = () => {
    const [task, setTask] = useState([]);

    const fetchDataFromDB = () => {
        axios.get('http://localhost:8081/getproduct')
            .then((res) => {
                setTask(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deleteproduct/${id}`)
            .then((res) => {
                alert("product deleted...!");
                fetchDataFromDB();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchDataFromDB();
    }, []);


    return (
        <div className="container-fluid mt-4">
            <div className="header" >
                <h2>Products</h2>
                <Link to={`/addproduct`} className="add"><button>Add Product</button></Link>
            </div>
            <hr />
            <div className="row">
                {task.length > 0 ? (
                    task.map((item) => (
                        <div key={item.id} className="col-3 card-main col-sm-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <h2>{item.id}</h2>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="img img-fluid"
                                />
                                <div className="body">
                                    <h5 className="title">{item.title ? item.title.substring(0, 30) : "No Title"}</h5>
                                    <p className="price">${item.price}</p>
                                    <p className="category">{item.category}</p>
                                    <p className="text">{item.description ? item.description.substring(0, 100) : "No Description"}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link
                                            to={`/update/${item.id}`}
                                            className="btn"
                                            state={{ product: item }}
                                        >
                                            Edit
                                        </Link>
                                        <button className="btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Data not found</h2>
                )}
            </div>
        </div>
    );
};

export default Tasks;
