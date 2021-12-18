const express = require('express');
const { getAllBlogs, postBlog, deleteBlog, updateBlog } = require ('../controllers/blogsControllers');

const router = express.Router();

router.get('/', getAllBlogs);

router.post('/', postBlog);

router.delete('/:id', deleteBlog);

router.patch('/:id', updateBlog);

module.exports = router;
