const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const blogRouter = require("./routes/blogRoute");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true
}));


app.use("/blogs", blogRouter)

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