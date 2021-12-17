const express = require('express');
const { getAllBlogs, postBlog, deleteBlog } = require ('../controllers/apiControllers');

const router = express.Router();

router.get('/blogs', getAllBlogs);

router.post('/blogs', postBlog);

router.delete('/blogs/:id', deleteBlog);

module.exports = router;
