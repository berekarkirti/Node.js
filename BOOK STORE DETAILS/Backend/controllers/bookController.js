const bookModel = require("../models/book")

// --------------------- get all books ------------------------
const getController = async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(400).json({ message: "Books Not Found !" });
    }
}

// --------------------- get single books ------------------------
const singledataController = async (req, res) => {
    const {id}=req.params
    try 
    {
       const data= await bookModel.findById(id)
       res.send(data)
    } 
    catch (error) 
    {
       res.send(error)
    }
}

// --------------------- add books ------------------------
const createController = async (req, res) => {
    try {
        const { ISBN } = req.body;
        const existingBook = await bookModel.findOne({ ISBN });
        
        if (existingBook) 
        {
            return res.status(400).json({ message: "Book with this ISBN already exists!" });
        }
        const book = new bookModel(req.body);
        await book.save();
        res.status(200).json({ message: "Book Added Successfully!" });
    } 
    catch (error) 
    {
        console.error("Error adding book:", error);
        res.status(400).json({ message: "Not Added!" });
    }
};

// --------------------- update books (err in this) ------------------------
const updateController = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await bookModel.findByIdAndUpdate(id,{$set:{...req.body}});

        if (!updatedBook) {
            return res.status(400).json({ message: "Not Updated!" });
        }
        else {
            res.status(200).json({ message: "Book Updated Successfully !" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error updating book" });
    }
}

// --------------------- delete books------------------------
const deleteController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await bookModel.findByIdAndDelete( id );
        if (!deletedBook) {
            return res.status(400).json({ message: "Book not deleted !" })
        }
        else {
            res.status(200).json({ message: "Book deleted Successfully !" })
        }
    }
    catch (error) {
        console.log(error)
    }

}

module.exports = { getController, singledataController, createController, updateController, deleteController } 