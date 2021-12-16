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
    test('will send status 400 if some information is missing in the body', async () => {
        const response = await api.post('/api/blogs');
        expect(response.status).toBe(400);
    })
    test('can post a new blog when body includes all the needed keys', async () => {
        const blog = {
            title: 'a title',
            author: 'an author',
            url: 'www.something.com',
            likes: 30,
        };
        const response = await api.post('/api/blogs').send(blog);
        expect(response.status).toBe(201);
        const existingBlogs = await api.get('/api/blogs');
        expect(existingBlogs.body.length).toBe(1);
        expect(existingBlogs.body[0]).toEqual(
            expect.objectContaining(blog)
        )
    })
})
test('_id property of each blog is replaced with id', async () => {
    const existingBlogs = await api.get('/api/blogs');
    expect(existingBlogs.body[0]._id).toBeFalsy();
    expect(existingBlogs.body[0].id).toBeDefined();
})

afterAll(() => {
    mongoose.connection.close();
})
