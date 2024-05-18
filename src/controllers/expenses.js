const expense = require('../models/expenses');
const { nameExpense } = require('../utils/duplicateRules');
const { deleteExpense } = require('../utils/deleteRules');
const { emptyName, emptyExpenseId } = require('../utils/emptyRules');
const { catchError } = require('../utils/errorCatch');

exports.getExpenses = async (req, res) => {
	try {
		const data = await expense.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {catchError(err, res)};
};

exports.createExpense = async (req, res) => {
	try {
		const emptyCheck = emptyName(req.body.expense_name);
		if (emptyCheck) {
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const body = { expense_id: crypto.randomUUID(), id_user: req.userid, expense_name: req.body.expense_name };
			const nameCheck = await nameExpense(req.userid, false, body.expense_name);
			if (nameCheck) {
				res.status(500).json({
					message: 'there are already category with that name, change with another unique name',
					data: { expense_name: body.expense_name }
				});
			} else {
				await expense.create(body);
				res.status(201).json({
					message: 'expense data successfully created',
					data: { expense_id: body.expense_id, expense_name: body.expense_name }
				});
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.updateExpense = async (req, res) => {
	try {
		const idCheck = await emptyExpenseId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'No expense with requested id!',
				data: req.params.id
			});
		} else {
			const emptyCheck = emptyName(req.body.expense_name);
			if (emptyCheck) {
				res.status(400).json({
					message: 'Please fill all the required fields!'
				});
			} else {
				const body = { expense_name: req.body.expense_name };
				const nameCheck = await nameExpense(req.userid, req.params.id, body.expense_name);
				if (nameCheck) {
					res.status(500).json({
						message: 'there are already category with that name, change with another unique name',
						data: { expense_name: body.expense_name }
					});
				} else {
					await expense.update(req.params.id, body);
					res.status(200).json({
						message: 'expense data successfully updated',
						data: {expense_id: req.params.id, ...body}
					});
				};
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.deleteExpense = async (req, res) => {
	try {
		const idCheck = await emptyExpenseId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'No expense with requested id!',
				data: req.params.id
			});
		} else {
			const deleteCheck = await deleteExpense(req.userid, req.params.id);
			if (deleteCheck) {
				res.status(500).json({
					message: 'cannot delete category that is in use on transactions',
					data: req.params.id
				});
			} else {
				await expense.remove(req.params.id);
				res.status(200).json({
					message: 'expense data successfully deleted'
				});
			};
		};
	} catch (err) {catchError(err, res)};
};