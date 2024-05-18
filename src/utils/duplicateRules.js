const users = require('../models/users');
const expenses = require('../models/expenses');
const incomes = require('../models/incomes');
const accounts = require('../models/accounts');

exports.nameExpense = async (userid, id, name) => {
	if (!id) {
		const res = await expenses.findAll(userid);
		const data = res.some(item => item.expense_name === name);
		return data;
	} else {
		const res = await expenses.findAll(userid);
		const mod = res.map(item => item.expense_id !== id && item.expense_name);
		const data = mod.includes(name);
		return data;
	};
};

exports.nameIncome = async (userid, id, name) => {
	if (!id) {
		const res = await incomes.findAll(userid);
		const data = res.some(item => item.income_name === name);
		return data;
	} else {
		const res = await incomes.findAll(userid);
		const mod = res.map(item => item.income_id !== id && item.income_name);
		const data = mod.includes(name);
		return data;
	};
};

exports.nameAccount = async (userid, id, name) => {
	if (!id) {
		const res = await accounts.findAll(userid);
		const data = res.some(item => item.account_name === name);
		return data;
	} else {
		const res = await accounts.findAll(userid);
		const mod = res.map(item => item.account_id !== id && item.account_name);
		const data = mod.includes(name);
		return data;
	};
};

exports.emailUser = async (email) => {
	const res = await users.findAll();
	const data = res.some(item => item.user_email === email);
	return data;
};