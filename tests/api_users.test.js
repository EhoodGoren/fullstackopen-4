const supertest = require('supertest')
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/user');

const api = supertest(app);

beforeAll(async () => {
    await User.deleteMany({});
})

describe('adding a new user', () => {
    const user = {
        username: 'joe5',
        password: '123',
    };
    test('with missing information fails with status 400', async () => {
        const postResponse = await api.post('/api/users').send(user);
        expect(postResponse.status).toBe(400);
    })
    test('with username or password shorter than 4 chars, fails with status 400', async () => {
        user.name = 'joe';
        const postResponse = await api.post('/api/users').send(user);
        expect(postResponse.status).toBe(400);
    })
    test('with a taken username fails with status 400', async () => {
        user.password = 12345;
        const postResponse = await api.post('/api/users').send(user);
        expect(postResponse.status).toBe(201);
        const similarUser = {
            username: user.username,
            password: '67890',
            name: 'other joe'
        };
        const secondPostResponse = await api.post('/api/users').send(similarUser);
        expect(secondPostResponse.status).toBe(400)
    })
})
test('getting all users', async () => {
    const getResponse = await api.get('/api/users');
    expect(getResponse.body.length).toBe(1);
})

afterAll(() => {
    mongoose.connection.close();
})