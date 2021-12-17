const express = require('express');
const { getAllBlogs, postBlog, deleteBlog, updateBlog } = require ('../controllers/apiControllers');

const router = express.Router();

router.get('/blogs', getAllBlogs);

router.post('/blogs', postBlog);

router.delete('/blogs/:id', deleteBlog);

router.patch('/blogs/:id', updateBlog);

module.exports = router;
