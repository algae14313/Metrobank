// test/api.test.js
const request = require('supertest');
const { app, server } = require('../src/index.js'); // Import both app and server

// Close the server after all tests to free up the port
afterAll(() => {
    server.close();
});

describe('API Endpoints', () => {

    test('GET /api/accounts - should return a list of accounts', async () => {
        const response = await request(app).get('/api/accounts');
        console.log(response.body); // Debugging log to inspect response
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Update if necessary
    });

    test('POST /api/login - should authenticate user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ username: 'testuser', password: 'testpass' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
