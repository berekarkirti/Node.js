const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const upload = require("../server/middleware/multer");
const userRouter = require("./routes/userroutes");
const notesRouter = require("./routes/notesroutes")
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.static("./upload"));
app.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file);
    try {
        await connection.fileModel.create({ filename: req.file.originalname });
        res.status(201).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        res.json({ error })
    }
});

// UserRouter:-
app.use("/user", userRouter)

// NotesRouter:-
app.use("/notes", notesRouter)

// Server:-
app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection;
        console.log("connected to database");
        console.log(`server is running on port ${process.env.PORT || 3000}`);
    }
    catch (error) {
        console.log(error);
    }
}
)