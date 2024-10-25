const express = require("express");
const { getController,singledataController, createController, updateController, deleteController } = require("../controllers/bookController");

const BookRouter = express.Router();

// ---------------------------------------------
BookRouter.get("/get", getController);

// ---------------------------------------------
BookRouter.get("/singledata/:id",singledataController)

// ---------------------------------------------
BookRouter.post("/create", createController);

// ---------------------------------------------
BookRouter.patch("/update/:id", updateController);

// ---------------------------------------------
BookRouter.delete("/delete/:id", deleteController);

// ---------------------------------------------
module.exports = BookRouter;



