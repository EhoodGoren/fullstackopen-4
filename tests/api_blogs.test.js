const supertest = require('supertest')
const app = require('../app');
const mongoose = require('mongoose');
const Blog = require('../src/models/blog');

const api = supertest(app);

beforeAll(async () => {
    await Blog.deleteMany({});
})

test('notes are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
})
test('database starts as empty array', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toEqual([]);
})
describe('adding a new blog', () => {
    const blog = {
        title: 'a title',
        author: 'an author',
        url: 'www.something.com',
        likes: 30,
    };
    test('will respond with status 400 if some keys are missing in the body', async () => {
        const response = await api.post('/api/blogs');
        expect(response.status).toBe(400);
    })
    test('without including "likes" will add field "likes" with value 0', async () => {
        const noLikesBlog = {...blog};
        delete noLikesBlog.likes;
        await api.post('/api/blogs').send(noLikesBlog);
        const existingBlogs = await api.get('/api/blogs');
        expect(existingBlogs.body[0]).toEqual(
            expect.objectContaining({
            ...noLikesBlog,
            likes: 0
        }));
    })
    test('is possible when body includes all the needed keys', async () => {
        const response = await api.post('/api/blogs').send(blog);
        expect(response.status).toBe(201);
        const existingBlogs = await api.get('/api/blogs');
        expect(existingBlogs.body.length).toBe(2);
        expect(existingBlogs.body[1]).toEqual(
            expect.objectContaining(blog)
        )
    })
})
test('_id property of each blog is replaced with id', async () => {
    const existingBlogs = await api.get('/api/blogs');
    expect(existingBlogs.body[0]._id).toBeFalsy();
    expect(existingBlogs.body[0].id).toBeDefined();
})

describe('deleting a blog', () => {
    test('fails with status code 404 if id is invalid', async () => {
        const deleteReponse = await api.delete('/api/blogs/123');
        expect(deleteReponse.status).toBe(404);
    })
    test('is possible when a valid id is specified', async () => {
        const blogList = await api.get('/api/blogs');
        const blogId = blogList.body[0].id;
        const deleteReponse = await api.delete(`/api/blogs/${blogId}`);
        expect(deleteReponse.status).toBe(200);
        const updatedBlogList = await api.get('/api/blogs');
        expect(updatedBlogList.body.length).toBe(1);
        expect(updatedBlogList.body.some(blog => blog.id === blogId)).toBe(false);
    })
})

afterAll(() => {
    mongoose.connection.close();
})
