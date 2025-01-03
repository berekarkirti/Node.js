const notesModel = require("../models/notesmodel")


// create notes
const createNotes = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) 
    {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try 
    {
        await notesModel.create({ title, body, userId: req.user._id });
        return res.status(200).json({ message: "Notes created successfully" });
    } 
    catch (error) 
    {
        return res.status(500).json({error: error.message });
    }
};

// delate note by user
const deleteNotes = async (req, res) => {
    
    const { notesId } = req.params
    const isExistNotes = await notesModel.findById(notesId)

    if (!isExistNotes) {
        res.status(400).json({ message: "notes not found" })
    }
    if (isExistNotes.userId !== req.user._id) {
        res.status(400).json({ message: "You can not delete this note" })
    }

    await notesModel.findByIdAndDelete(notesId);
    res.status(200).json({ message: 'Notes deleted successfully' })

}

// get notes by user
const GetAllNotesByUser = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId,req.user._id)
    try {
        if (userId != req.user._id) {
            return res.status(200).json({ message: "you don't have permisson to view this notes" })
        }
        const allUserNotes = await notesModel.find({ userId: userId })
        if (allUserNotes.length === 0) {
            res.status(400).json({ message: "No notes found" })
        }
        res.status(200).json({ allUserNotes })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// get single note of user
const GetSingleNoteByUser = async (req, res) => {
    const { notesId } = req.params;

    try {
        const isExistNotes = await notesModel.findById(notesId)

        if (!isExistNotes) {
            res.status(400).json({ message: "notes not found" })
        }
        if (isExistNotes.userId !== req.user._id) {
            res.status(400).json({ message: "You don't have permission to get this notes" });
        }

        res.status(200).json({ notes: isExistNotes })

    } catch (error) {
        res.status(400).json({ message: error })
    }

}

const updateNotes = async (req, res) => {
    const { notesId } = req.params;

    try {
        const isExistNotes = await notesModel.findById(notesId);
        if (!isExistNotes) {
            return res.status(400).json({ message: "notes not found" });
        }

        if (isExistNotes.userId != req.user._id) {
            return res.status(400).json({ message: "You dont have permission to update this notes" });
        }

        if (req.file) {
            await notesModel.findByIdAndUpdate(notesId, {
                ...req.body,
                notesImage: req.file.originalname,
            })
            res.status(200).json({ message: "Notes updated successfully." });
        }
        else {
            await notesModel.findByIdAndUpdate(notesId, req.body);
            res.status(200).json({ message: "Notes updated successfully." });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const GetAllNotesByAdmin = async (req, res) => {
    try {
        const totalNotes = await notesModel.find({});
        // console.log("Fetched notes:",totalNotes);

        if (totalNotes.length === 0) {
            return res.status(400).json({ message: "Notes not exist" });
        }

        res.status(200).json({ message: "Notes gets successfully", totalNotes });

    }
    catch (error) {
        console.error("Error fetching notes:", error);
        res.status(400).json({ message: error });
    }
}

const deleteAllNotesByAdmin = async (req, res) => {
    try {
        await notesModel.deleteMany({});
        res.status(200).json({ message: "Notes deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}

module.exports = { createNotes, deleteNotes, GetAllNotesByUser, GetSingleNoteByUser, updateNotes, GetAllNotesByAdmin, deleteAllNotesByAdmin }