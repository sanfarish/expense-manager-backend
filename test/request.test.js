const request = require('supertest');
const express = require('express');
const notFound = require('../src/middlewares/notFound');
const authRoute = require('../src/routes/auth');

const mockUsers = [
	{
		user_id: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
		user_name: 'Faris Hasan',
		user_email: 'faris@mail.com',
		user_password: 'faris'
	}
];

jest.mock("../src/models/users", () => ({
	findAll: jest.fn().mockImplementation(() => Promise.resolve(mockUsers))
}));

jest.mock('bcrypt', () => ({
	compare: jest.fn().mockImplementation((a, b) => {
		if (a === b) {
			return Promise.resolve(true);
		} else {
			return Promise.resolve(false);
		};
	})
}));

describe('GET /anywhere', () => {

	let app;

	beforeAll(() => {
		app = express();
		app.use('*', notFound);
	});

	test('Should response with http status code 404', async () => {

		const res = await request(app).get('/anywhere');

		expect(res.statusCode).toBe(404);
	});
});

describe('POST /login', () => {

	let app;
	process.env.ACCESS_SECRET_TOKEN = 'testSecretToken';

	beforeAll(() => {
		app = express();
		app.use(express.json());
		app.use('/api/v1', authRoute);
	});

	test('Proper input will reponse with http status code 200 and provide accessToken', async () => {

		const res = await request(app)
		.post('/api/v1/login')
		.send({
			user_email: 'faris@mail.com',
			user_password: 'faris'
		});

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toContain('logged in');
		expect(res.body.data).toHaveProperty('accessToken');
	});
});