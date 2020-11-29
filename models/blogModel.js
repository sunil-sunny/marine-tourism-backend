const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    author_id:{
        type: String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;