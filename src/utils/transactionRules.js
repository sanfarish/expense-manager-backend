const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');

exports.multipleRule = (body) => {
	return (
		(('id_income' in body && body.id_income !== '') && ('id_expense' in body && body.id_expense !== ''))
		|| (('id_income' in body && body.id_income !== '') && ('id_transfer' in body && body.id_transfer !== ''))
		|| (('id_expense' in body && body.id_expense !== '') && ('id_transfer' in body && body.id_transfer !== ''))
		|| (('id_income' in body && body.id_income !== '') && ('id_expense' in body && body.id_expense !== '') && ('id_transfer' in body && body.id_transfer !== ''))
	);
};

exports.idRule = async (userid, body) => {

	const idAccount = async () => {
		if (body.id_account && body.id_account !== '') {
			const res = await account.findAll(userid);
			const data = res.some(item => item.account_id === body.id_account);
			return data;
		} else {
			return true;
		};
	};

	const idIncome = async () => {
		if (body.id_income && body.id_income !== '') {
			const res = await income.findAll(userid);
			const data = res.some(item => item.income_id === body.id_income);
			return data;
		} else {
			return true;
		};
	};

	const idExpense = async () => {
		if (body.id_expense && body.id_expense !== '') {
			const res = await expense.findAll(userid);
			const data = res.some(item => item.expense_id === body.id_expense);
			return data;
		} else {
			return true;
		};
	};

	const idTransfer = async () => {
		if (body.id_transfer && body.id_transfer !== '') {
			const res = await account.findAll(userid);
			const data = res.some(item => item.account_id === body.id_transfer);
			return data;
		} else {
			return true;
		};
	};

	const accountCheck = await idAccount();
	const incomeCheck = await idIncome();
	const expenseCheck = await idExpense();
	const transferCheck = await idTransfer();

	return (!accountCheck || !incomeCheck || !expenseCheck || !transferCheck);
};