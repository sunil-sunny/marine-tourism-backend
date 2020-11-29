const express = require('express')
const router = express.Router()
const auth = require('../configuration/authMiddleware')

const { createBlog, viewBlogs, getMyBlogs, deleteBlog } = require('../controllers/blogManagementController')

router.post('/createBlog', auth, createBlog);

router.get('/getAllBlogs', auth, viewBlogs);

router.get('/getMyBlogs', auth, getMyBlogs);

router.delete('/deleteBlog/:id', auth, deleteBlog)

module.exports = router;