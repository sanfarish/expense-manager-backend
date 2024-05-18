const account = require('../models/accounts');
const transaction = require('../models/transactions');

const balanceFinder = async (userid, id) => {
	try {
		const data = await account.findByID(userid, id);
		return data[0].account_balance;
	} catch (err) {console.error(err)};
};

const transactionFinder = async (userid, id) => {
	try {
		const data = await transaction.findByID(userid, id);
		return data[0];
	} catch (err) {console.error(err)};
};

exports.addBalance = async (userid, body) => {
	try {
		const accountBalance = await balanceFinder(userid, body.id_account);
		if (body.id_income !== '') {
			await account.update(body.id_account, {account_balance: accountBalance + body.transaction_amount});
		} else if (body.id_expense !== '') {
			await account.update(body.id_account, {account_balance: accountBalance - body.transaction_amount});
		} else if (body.id_transfer !== '') {
			const transferBalance = await balanceFinder(userid, body.id_transfer);
			await account.update(body.id_account, {account_balance: accountBalance - body.transaction_amount});
			await account.update(body.id_transfer, {account_balance: transferBalance + body.transaction_amount});
		};
	} catch (err) {console.error(err)};
};

exports.removeBalance = async (userid, id) => {
	try {
		const data = await transactionFinder(userid, id);
		const accountBalance = await balanceFinder(userid, data.id_account);
		if (data.id_income !== '') {
			await account.update(data.id_account, {account_balance: accountBalance - data.transaction_amount});
		} else if (data.id_expense !== '') {
			await account.update(data.id_account, {account_balance: accountBalance + data.transaction_amount});
		} else if (data.id_transfer !== '') {
			const transferBalance = await balanceFinder(userid, data.id_transfer);
			await account.update(data.id_account, {account_balance: accountBalance + data.transaction_amount});
			await account.update(data.id_transfer, {account_balance: transferBalance - data.transaction_amount});
		};
	} catch (err) {console.error(err)};
};

exports.bodyAppend = (source, body) => {
	if (source.id_income) {
		body.id_income = source.id_income;
		body.id_expense = '';
		body.id_transfer = '';
	} else if (source.id_expense) {
		body.id_income = '';
		body.id_expense = source.id_expense;
		body.id_transfer = '';
	} else if (source.id_transfer) {
		body.id_income = '';
		body.id_expense = '';
		body.id_transfer = source.id_transfer;
	};
	return body;
};