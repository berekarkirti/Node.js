import React from 'react'
import { Routes,Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookEdit from './components/BookEdit'
import BookDetails from './components/BookDetails'


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<BookList/>} />
        <Route path="/addbook" element={<BookForm/>} />
        <Route path="/editbook/:id" element={<BookEdit/>} />
        <Route path="/bookdetail/:id" element={<BookDetails/>} />
    </Routes>
  )
}

export default AllRoutes
