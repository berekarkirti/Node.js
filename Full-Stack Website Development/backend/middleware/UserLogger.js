const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const UserLogger = (req, res, next) => {
    const { email, role } = req.body;

    // Check if email exists
    if (!email) {
        return res.status(400).json({ message: "Please fill all details of user" });
    }

    const userRole = role || "user";

    // Log the user details to a file
    const logEntry = `\nEmail: ${email},\nRole: ${userRole}, \nMethod: ${req.method}, \nURL: ${req.url}\n`;

    // append data in log.txt file
    fs.appendFileSync("./logs.txt", logEntry, "utf-8");

    next();
};

module.exports = UserLogger;

