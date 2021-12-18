const Blog = require('../models/blog');
const User = require('../models/user');

async function getAllBlogs(req, res) {
    const blogs = await Blog.find({}).populate('user', { username:1, name:1 });
    res.json(blogs);
}

async function postBlog(req, res) {
    const { title, author, url, likes=0 } = req.body
    if(!title || !author || !url ){
        return res.status(400).send('Missing information');
    }
    const user = await User.findOne({username: author});
    const postResponse = await Blog.create({ title, author, url, likes, user: user.id });
    user.blogs = user.blogs.concat(postResponse.id);
    await user.save();
    res.status(201).json(postResponse);
}

async function deleteBlog(req, res) {
    const { id } = req.params;
    try{
        await Blog.deleteOne({_id: id});
        return res.status(200).send('Deleted successfully');
    } catch(error) {
        return res.status(404).send("Can't find blog");
    }
}

async function updateBlog(req, res) {
    const { id } = req.params;
    const changes = req.body;
    try {
        await Blog.findByIdAndUpdate(id, changes);
        return res.status(200).send('Updated successfully');
    } catch (error) {
        return res.status(404).send("Can't find blog");
    }
}

module.exports = {
    getAllBlogs,
    postBlog,
    deleteBlog,
    updateBlog
}
