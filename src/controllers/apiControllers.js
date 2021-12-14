const Blog = require('../models/blog');

async function getAllBlogs(req, res) {
    const blogs = await Blog.find({});
    console.log(blogs);
    res.json(blogs);
}

async function postBlog(req, res) {
    const { title, author, url, likes } = req.body
    if(!title || !author || !url || !likes){
        return res.status(400).send('Missing information');
    }
    const postResponse = await Blog.create({ title, author, url, likes });
    res.status(201).json(postResponse);
}

module.exports = {
    getAllBlogs,
    postBlog
}
