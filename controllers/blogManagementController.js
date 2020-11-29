const Blog = require('../models/blogModel')

const createBlog = async (req, res) => {

    try {
        const { title, description } = req.body;
        if (title.length > 0 || description.length > 0) {
            const blog = new Blog({ author: req.user.fullname, author_id: req.user._id, title, description });
            await blog.save()
            res.status(201).json({
                "result": "Success"
            })
        } else {
            throw new Error('Blog should have empty author and decsription')
        }

    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }

};

const viewBlogs = async (req, res) => {

    try {
        res.status(200).send(await Blog.find({}))
    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }

};

const getMyBlogs = async (req, res) => {
    try {
        res.status(200).send(await Blog.find({ author_id: req.user._id }).exec())
    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).send({
            "status": "Deleted"
        })
    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }
}

module.exports = { createBlog, viewBlogs, getMyBlogs, deleteBlog }