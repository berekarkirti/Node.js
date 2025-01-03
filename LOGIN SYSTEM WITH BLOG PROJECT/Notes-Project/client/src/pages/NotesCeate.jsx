import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/NotesCeate.css"



const NotesCreate = () => {

    const [title,settitle]=useState("")
    const [body, setbody]=useState("")

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()

        let notesdata={title,body}

        axios.post(`${import.meta.env.VITE_BASEURL}/notes/create`,notesdata,{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res);
            toast.success(res.data.message || "Notes Created Successfully");
            setbody("");
            settitle("");
            navigate("/notes");
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message || "Error Occured")
        })
    }
  return (
   <div className="kirti">
      <div
      id="kirti2"
      className="container p-5 max-w-3xl mx-auto mt-5 mb-5 "
      style={{ maxWidth:"30%",border:"2.5px solid teal",borderRadius:"8px"}}
    >
      <h1 className="text-center my-4">Create a Note</h1>
      <Form className="d-flex  flex-column gap-3" onSubmit={handleSubmit}>
        <Form.Group className="d-flex  flex-wrap gap-3">
          <Form.Control
            type="text"
            placeholder="Enter Title"
            className="flex-fill"
            value={title} onChange={(e)=>settitle(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Enter Your Content"
            className="flex-fill"
            value={body} onChange={(e)=>setbody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>
    </div>
   </div>
  );
};

export default NotesCreate;