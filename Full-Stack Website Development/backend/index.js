const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


// UserRouter:-
app.use("/user", userRouter)

// Server:-
app.listen(process.env.PORT || 3000, async () => 
{
    try 
    {
        await connection;
        console.log("connected to database");
        console.log(`server is running on port ${process.env.PORT || 3000}`);
    }
    catch (error) 
    {
        console.log(error);
    }
}
)