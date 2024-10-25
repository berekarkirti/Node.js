const express = require("express")
const mongoose = require("mongoose")
const BookRouter = require("./routes/bookRoutes")
const app = express()
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use("/books", BookRouter)

const connectToDb = async () => {
    try 
    {
        await mongoose.connect("mongodb://127.0.0.1:27017/Bookdata");
        console.log("connected to db");
    }
    catch (error) 
    {
        console.log(error)
    }
}
connectToDb();

app.listen(8081, () => 
{
    console.log("Server running on port 8081");
});