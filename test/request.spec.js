const request = require('supertest');
const express = require('express');
const { getTransactions } = require('../src/controllers/transactions');
const { getAccounts } = require('../src/controllers/accounts');
const { login } = require('../src/controllers/auth');
const dataRoute = require('../src/routes/data');
const authRoute = require('../src/routes/auth');

// INFO: un-comment jest.mock and other mock option to use mock data if prefered, otherwise run the test without mock data

// jest.mock('../src/controllers/transactions');
// jest.mock('../src/controllers/accounts');
// jest.mock('../src/controllers/auth');


describe('request GET to get json data', () => {

	let app;

	const mockAuth = (req, res, next) => {
		req.userid = '08b680c7-3c47-485c-ba81-cf58821cbd7c'; // mocking faris userid
		next();
	};

	beforeAll(() => {
		app = express();
		app.use(mockAuth);
		app.use(dataRoute);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('GET transactions', async () => {

		// const mockData = [
		// 	{
		// 		"transaction_id": "131189c7-a5a7-42da-98d9-4abc1ab5dff0",
		// 		"transaction_time": "2024-03-02T11:30:00.000Z",
		// 		"id_account": "281f1213-d4a9-4973-8b1d-aab19e795c39",
		// 		"account_name": "Cash",
		// 		"id_income": "",
		// 		"income_name": "",
		// 		"id_expense": "9c3b186b-063b-4ae3-b0ea-32aeb0f93cf8",
		// 		"expense_name": "Makan",
		// 		"id_transfer": "",
		// 		"transfer_name": "",
		// 		"transaction_amount": 300000,
		// 		"transaction_note": "Traktiran selesai kontrak dari freelance drafter",
		// 		"transaction_bill": ""
		// 	},
		// 	{
		// 		"transaction_id": "a567ca38-c0c3-4de5-bbe1-baa53b3f5253",
		// 		"transaction_time": "2024-03-01T04:30:00.000Z",
		// 		"id_account": "a60700eb-b1dd-4b12-ac6e-c1b459511bf0",
		// 		"account_name": "BNI",
		// 		"id_income": "",
		// 		"income_name": "",
		// 		"id_expense": "",
		// 		"expense_name": "",
		// 		"id_transfer": "281f1213-d4a9-4973-8b1d-aab19e795c39",
		// 		"transfer_name": "Cash",
		// 		"transaction_amount": 800000,
		// 		"transaction_note": "Tarik tunai buat pegangan cash",
		// 		"transaction_bill": ""
		// 	},
		// 	{
		// 		"transaction_id": "e863441a-0e53-4671-9dae-2625fb7b4873",
		// 		"transaction_time": "2024-02-29T23:00:00.000Z",
		// 		"id_account": "a60700eb-b1dd-4b12-ac6e-c1b459511bf0",
		// 		"account_name": "BNI",
		// 		"id_income": "5332816f-aa42-4abc-988e-c508a8cfe114",
		// 		"income_name": "Gaji",
		// 		"id_expense": "",
		// 		"expense_name": "",
		// 		"id_transfer": "",
		// 		"transfer_name": "",
		// 		"transaction_amount": 6500000,
		// 		"transaction_note": "Gaji pertama sebagai software engineer",
		// 		"transaction_bill": ""
		// 	}
		// ];

		// getTransactions.mockImplementation(async (req, res) => {
		// 	res.status(200).json(mockData);
		// });

		const response = await request(app).get('/transactions');

		expect(response.status).toEqual(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body[0]).not.toHaveProperty('id_user'); // vulnerable property
		expect(response.body[0]).toHaveProperty('transaction_bill');
	});

	it('GET accounts', async () => {

		// const mockData = [
		// 	{
		// 		"account_id": "a60700eb-b1dd-4b12-ac6e-c1b459511bf0",
		// 		"account_name": "BNI",
		// 		"account_balance": 5700000
		// 	},
		// 	{
		// 		"account_id": "281f1213-d4a9-4973-8b1d-aab19e795c39",
		// 		"account_name": "Cash",
		// 		"account_balance": 435000
		// 	},
		// 	{
		// 		"account_id": "353eac86-ae83-4d28-aec7-f08c40ef80b4",
		// 		"account_name": "Gopay",
		// 		"account_balance": 0
		// 	}
		// ];

		// getAccounts.mockImplementation(async (req, res) => {
		// 	res.status(200).json(mockData);
		// });

		const response = await request(app).get('/accounts');

		expect(response.status).toEqual(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body[0]).not.toHaveProperty('id_user'); // vulnerable property
		expect(response.body[0]).toHaveProperty('account_id');
	});
});

describe('request POST login to get jwt token', () => {

	let app;

	beforeAll(() => {
		app = express();
		app.use(express.json());
		app.use(authRoute);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('POST login', async () => {

		// const mockData = {
		// 	data: {
		// 		accessToken: 'asdfghjkl.0123456789.zxcvbnm'
		// 	}
		// };

		const mockRequest = {
			user_email: 'faris@mail.com',
			user_password: 'faris'
		};

		// login.mockImplementation(async (req, res) => {
		// 	res.status(200).json(mockData);
		// });

		const response = await request(app).post('/login').send(mockRequest).set('Accept', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.body).toBeInstanceOf(Object);
		expect(response.body.data).toHaveProperty('accessToken'); // important property
	});
});