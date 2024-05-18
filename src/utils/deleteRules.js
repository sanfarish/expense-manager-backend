const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');
const transaction = require('../models/transactions');

exports.deleteUserData = async (userid) => {
	await transaction.removeAll(userid);
	await account.removeAll(userid);
	await income.removeAll(userid);
	await expense.removeAll(userid);
};

exports.deleteExpense = async (userid, id) => {
	const res = await transaction.findAll(userid);
	const data = res.some(item => item.id_expense === id);
	return data;
};

exports.deleteIncome = async (userid, id) => {
	const res = await transaction.findAll(userid);
	const data = res.some(item => item.id_income === id);
	return data;
};

exports.deleteAccount = async (userid, id) => {
	const res = await transaction.findAll(userid);
	const data = res.some(item => item.id_account === id || item.id_transfer === id);
	return data;
};