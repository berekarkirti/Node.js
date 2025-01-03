import React, { useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

const Update = () => {

  const [title,settitle]=useState("")
  const [body,setbody]=useState("")
  const [file,setfile]=useState(null)

  const {Id}=useParams()

  const handleSubmit=(e)=>{
    e.preventDefault()

    axios.patch(`${import.meta.env.VITE_BASEURL}/notes/update/${Id}`,{title,body,file},{
      headers:{
        "Content-Type": "multipart/form-data"
      },
      withCredentials:true
    })
    .then((res)=>{
      console.log(res.data)
      toast.success(res?.data?.message || "Notes updated successfully")
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err?.response?.data?.message || "Error updating notes")
    })
  }

  return (
    <div className='container my-5 p-5' style={{maxWidth:"30%",minHeight:"70.5vh",border:"2.5px solid teal",borderRadius:"8px"}}>
      <h1 className='text-center'>Update Note</h1>
      <Form className='mt-4' onSubmit={handleSubmit}>
        <Form.Group controlId='title' className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter Title' onChange={(e)=>settitle(e.target.value)} value={title}/>
        </Form.Group>

        <Form.Group controlId='title' className='mb-3'>
          <Form.Label>Content</Form.Label>
          <Form.Control type='text' placeholder='Enter Body Content' onChange={(e)=>setbody(e.target.value)} value={body}/>
        </Form.Group>

        <Form.Group controlId="file" className='mb-3'>
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={(e)=>setfile(e.target.files[0])} />
        </Form.Group>

        <Button variant='primary' className='mt-5 w-100' type='submit'>Upload Note</Button>
      </Form>
    </div>
  )
}

export default Update