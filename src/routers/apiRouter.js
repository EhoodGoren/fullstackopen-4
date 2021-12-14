const express = require('express');
const { getAllBlogs, postBlog } = require ('../controllers/apiControllers');

const router = express.Router();

router.get('/blogs', getAllBlogs);

router.post('/blogs', postBlog);

module.exports = router;
