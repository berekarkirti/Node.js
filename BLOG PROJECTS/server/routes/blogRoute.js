const express = require("express");
const { getBlog, postBlog, getsingleBlog, patchBlog, deleteBlog } = require("../controller/blogController");

const blogRouter = express.Router()

blogRouter.get("/getblog",getBlog)
blogRouter.post("/postblog",postBlog)
blogRouter.get("/getsingleblog/:id",getsingleBlog)
blogRouter.patch("/patchblog/:id",patchBlog)
blogRouter.delete("/deleteblog/:id",deleteBlog)

module.exports=blogRouter