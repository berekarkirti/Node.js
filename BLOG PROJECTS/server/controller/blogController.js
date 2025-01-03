const blogModel = require("../models/blogModel")

const getBlog = async (req, res) => {
    try {
        const Blogs = await blogModel.find();
        res.status(200).json(Blogs);
    }
    catch (error) {
        res.status(400).json({ message: "Blogs Not Found !" });
    }
}

const getsingleBlog = async (req, res) => {
    const { id } = req.params
    try {
        const data = await blogModel.findById(id);
        if (!data) {
            return res.status(400).json({ message: "Blog Not Found!" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ message: "Error fetching blog", error });
    }
}


const postBlog = async (req, res) => {
    const { Title, Author, Content, Tag, PublishedDate } = req.body;

    if (!Title || !Author || !Content || !Tag || !PublishedDate) {
        return res.status(400).json({ message: "Title, Author, Content, Tag, and PublishedDate are required." });
    }

    try {

        const newId = Date.now();

        await blogModel.create({
            id: newId,
            Title,
            Author,
            Content,
            Tag,
            PublishedDate
        });

        return res.status(200).json({ message: 'Blog created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


const patchBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { $set: { ...req.body } });

        if (!updatedBlog) {
            return res.status(400).json({ message: "Not Updated!" });
        }
        else {
            res.status(200).json({ message: "Blog Updated Successfully !" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error updating blog" });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(400).json({ message: "Blog not deleted !" })
        }


        res.status(200).json({ message: "Blog deleted Successfully !" })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting blog", error });
    }

}

module.exports = { getBlog, postBlog, patchBlog, deleteBlog, getsingleBlog }