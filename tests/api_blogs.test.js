const supertest = require('supertest')
const app = require('../app');
const mongoose = require('mongoose');
const Blog = require('../src/models/blog');
const User = require('../src/models/user');
const { updateBlog } = require('../src/controllers/blogsControllers');

const api = supertest(app);

let authToken;
beforeAll(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const user = {
        username: 'joe5',
        password: '12345',
        name: 'joe'
    };
    const postResponse = await api.post('/api/users').send(user);
    authToken = postResponse.text
})


test('blogs are returned as json', async () => {
    await api.get('/api/blogs').set('Authorization', authToken).expect(200).expect('Content-Type', /application\/json/);
})
test('database starts as empty array', async () => {
    const blogs = await api.get('/api/blogs').set('Authorization', authToken);
    expect(blogs.body).toEqual([]);
})
describe('adding a new blog', () => {
    const blog = {
        title: 'a title',
        url: 'www.something.com',
        likes: 30,
    };
    test('will respond with status 400 if some keys are missing in the body', async () => {
        const response = await api.post('/api/blogs').set('Authorization', authToken);
        expect(response.status).toBe(400);
    })
    test('without including "likes" will add field "likes" with value 0', async () => {
        const noLikesBlog = {...blog};
        delete noLikesBlog.likes;
        await api.post('/api/blogs').set('Authorization', authToken).send(noLikesBlog);
        const existingBlogs = await api.get('/api/blogs').set('Authorization', authToken);
        expect(existingBlogs.body[0]).toEqual(
            expect.objectContaining({
            ...noLikesBlog,
            likes: 0
        }));
    })
    test('is possible when body includes all the needed keys', async () => {
        const response = await api.post('/api/blogs').set('Authorization', authToken).send(blog);
        expect(response.status).toBe(201);
        const existingBlogs = await api.get('/api/blogs').set('Authorization', authToken);
        expect(existingBlogs.body.length).toBe(2);
        expect(existingBlogs.body[1]).toEqual(
            expect.objectContaining(blog)
        )
    })
})
test('_id property of each blog is replaced with id', async () => {
    const existingBlogs = await api.get('/api/blogs').set('Authorization', authToken);
    expect(existingBlogs.body[0]._id).toBeFalsy();
    expect(existingBlogs.body[0].id).toBeDefined();
})

describe('deleting a blog', () => {
    test('fails with status code 404 if id is invalid', async () => {
        const deleteReponse = await api.delete('/api/blogs/123').set('Authorization', authToken);
        expect(deleteReponse.status).toBe(404);
    })
    test('is possible when a valid id is specified', async () => {
        const blogList = await api.get('/api/blogs').set('Authorization', authToken);
        const blogId = blogList.body[0].id;
        const deleteReponse = await api.delete(`/api/blogs/${blogId}`).set('Authorization', authToken);
        expect(deleteReponse.status).toBe(200);
        const updatedBlogList = await api.get('/api/blogs').set('Authorization', authToken);
        expect(updatedBlogList.body.length).toBe(1);
        expect(updatedBlogList.body.some(blog => blog.id === blogId)).toBe(false);
    })
})

describe('updating a blog', () => {
    test('with an invalid id will fail with status 400', async () => {
        const updateResponse = await api.patch('/api/blogs').set('Authorization', authToken);
        expect(updateResponse.status).toBe(404);
    })
    test('with a valid id will update blog', async () => {
        const getResponse = await api.get('/api/blogs').set('Authorization', authToken);
        const blog = getResponse.body[0];
        const updatedBlog = {...blog, likes: 33};
        delete updatedBlog.user;
        const updateResponse = await api.patch(`/api/blogs/${blog.id}`).set('Authorization', authToken).send(updatedBlog);
        expect(updateResponse.status).toBe(200);
        const updatedListResponse = await api.get('/api/blogs').set('Authorization', authToken);
        const updatedList = updatedListResponse.body;
        expect(updatedList.length).toBe(1);
        expect(updatedList[0]).toEqual(expect.objectContaining(updatedBlog));
    })
})

afterAll(() => {
    mongoose.connection.close();
})
