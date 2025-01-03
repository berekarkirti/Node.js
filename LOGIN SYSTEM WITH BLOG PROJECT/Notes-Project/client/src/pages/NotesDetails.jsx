import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from "moment";
import "../styles/NotesDetails.css";

const NotesDetails = () => {
    const [notedata, setnotedata] = useState({});
    const { Id } = useParams();
    // console.log(Id)

    const getsinglenotes = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/notes/getsinglenotes/${Id}`, {
            withCredentials: true,
        }).then((res) => {
            // console.log(res);
            setnotedata(res.data.notes)
        }).catch((err) => {
            console.log(err);

        })
    }

    useEffect(() => {
        getsinglenotes();
    }, []);

    return (
        <div className="container-fluid" id="NotesDetails" >

            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="text-center">
                            <img src={notedata.notesImage}
                                alt="Blog Title"
                                className="img-fluid roundes mb-3"
                                height={600}
                                width={600} />
                            <h2>{notedata.title}</h2>
                            <p className="text-muted small">{moment(notedata.createdAt).fromNow()}</p>
                            <div className="blog-content">{notedata.body}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NotesDetails