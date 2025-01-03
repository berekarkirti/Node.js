const express=require("express");
const isAuth = require("../middleware/Auth");
const upload = require("../middleware/multer");
const { createNotes, deleteNotes, GetAllNotesByUser, GetSingleNoteByUser, updateNotes, GetAllNotesByAdmin, deleteAllNotesByAdmin } = require("../controller/notesController");
const isAdmin = require("../middleware/Admin");

const notesRouter= express.Router()

notesRouter.post("/create",isAuth,createNotes)
notesRouter.delete("/delete/:notesId",isAuth,deleteNotes)

// by user:-
notesRouter.get("/getallnotes/:userId",isAuth,GetAllNotesByUser)
notesRouter.get("/getsinglenotes/:notesId",isAuth,GetSingleNoteByUser)
notesRouter.patch("/update/:notesId",isAuth,upload.single("file"),updateNotes)

// by admin:-
notesRouter.get("/getallnotesbyadmin",isAuth,isAdmin,GetAllNotesByAdmin)
notesRouter.delete("/deleteallnotesbyadmin",isAuth,isAdmin,deleteAllNotesByAdmin)

module.exports=notesRouter