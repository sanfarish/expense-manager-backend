const { emptyTransaction } = require("../src/utils/emptyRules");
const { multipleRule, idRule } = require("../src/utils/transactionRules");

const userid = '08b680c7-3c47-485c-ba81-cf58821cbd7c'; // mocking faris userid

// mock request data
const mock = {
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

/* test to get RIGHT value */

test('check if all input filled in request', () => {
	expect(emptyTransaction(mock.right)).toBe(false); // false means NOT EMPTY, true means EMPTY
});

test('check if transaction type (id) properly filled in request', () => {
	expect(multipleRule(mock.right)).toBe(false); // false means PROPER, true means UNPROPER
});

test('check if account / category is included in existing data', async () => {
	expect(await idRule(userid, mock.right)).toBe(false); // false means ID EXIST, true means ID NOT EXIST
});

/* test to get WRONG value */

test('check if some input NOT filled in request', () => {
	expect(emptyTransaction(mock.wrong)).toBe(true);
});

test('check if transaction type (id) NOT properly filled in request', () => {
	expect(multipleRule(mock.wrong)).toBe(true);
});

test('check if account / category is NOT included in existing data', async () => {
	expect(await idRule(userid, mock.wrong)).toBe(true);
});

// note:
// PROPER = one transaction type requested, whether income, expense, or transfer
// UNPROPER = multiple transaction type requested (incompatible)