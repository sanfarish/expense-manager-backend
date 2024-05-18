const { emptyTransaction } = require("../src/utils/emptyRules");
const { multipleRule, idRule } = require("../src/utils/transactionRules");

const userid = '08b680c7-3c47-485c-ba81-cf58821cbd7c'; // mocking faris userid

const mockRequest = {
	right: {
		transaction_time: '2024-03-15T05:00', // minimum year is 2000 and maximum year is 2050
		id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
		id_income: '90074426-86b8-478d-8921-1241f0810729', // requiring only one of them (id_income or id_expense or id_transfer) to be filled
		// id_expense: '',
		id_transfer: '', // can be empty or not creating the key entirely if one of them already been filled
		transaction_amount: '25000'
	},
	wrong: {
		transaction_time: null,
		id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
		id_expense: '9749ed15-b5c9-49ad-b7d1-3fb44aae95af',
		id_transfer: 'asdfghjkl',
		transaction_amount: '3.1415'
	}
};

const mockAccount = [
	{
		account_id: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
		account_name: 'test',
		account_balance: 0
	}
];

const mockIncome = [
	{
		income_id: '0',
		income_name: 'test'
	}
];

const mockExpense = [
	{
		expense_id: '9749ed15-b5c9-49ad-b7d1-3fb44aae95af',
		expense_name: 'test'
	}
];

jest.mock("../src/models/accounts", () => ({
	findAll: jest.fn().mockImplementation(id => {
		if (id === userid) {
			return Promise.resolve(mockAccount);
		} else {
			return Promise.resolve(null);
		};
	})
}));

jest.mock("../src/models/incomes", () => ({
	findAll: jest.fn().mockImplementation(id => {
		if (id === userid) {
			return Promise.resolve(mockIncome);
		} else {
			return Promise.resolve(null);
		};
	})
}));

jest.mock("../src/models/expenses", () => ({
	findAll: jest.fn().mockImplementation(id => {
		if (id === userid) {
			return Promise.resolve(mockExpense);
		} else {
			return Promise.resolve(null);
		};
	})
}));

describe('Accepted response test', () => {

	test('All input should be filled in request', () => {
		expect(emptyTransaction(mockRequest.right)).toBe(false); // false means NOT EMPTY, true means EMPTY
	});

	test('Transaction type (id) should be properly filled in request', () => {
		expect(multipleRule(mockRequest.right)).toBe(false); // false means PROPER, true means UNPROPER
	});

	test('Account / category should be included in existing data', async () => {
		expect(await idRule(userid, mockRequest.right)).toBe(false); // false means ID EXIST, true means ID NOT EXIST
	});
});

describe('Rejected response test', () => {
	
	test('Reject request that is NOT containing all input', () => {
		expect(emptyTransaction(mockRequest.wrong)).toBe(true);
	});

	test('Reject request with multiple or no Transaction type (id)', () => {
		expect(multipleRule(mockRequest.wrong)).toBe(true);
	});

	test('Reject request with no registered account id / category id', async () => {
		expect(await idRule(userid, mockRequest.wrong)).toBe(true);
	});
});

// note:
// PROPER = one transaction type requested, whether income, expense, or transfer
// UNPROPER = multiple transaction type requested (incompatible)