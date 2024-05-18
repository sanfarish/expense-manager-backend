const income = require('../models/incomes');
const { nameIncome } = require('../utils/duplicateRules');
const { deleteIncome } = require('../utils/deleteRules');
const { emptyName, emptyIncomeId } = require('../utils/emptyRules');
const { catchError } = require('../utils/errorCatch');

exports.getIncomes = async (req, res) => {
	try {
		const data = await income.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {catchError(err, res)};
};

exports.createIncome = async (req, res) => {
	try {
		const emptyCheck = emptyName(req.body.income_name);
		if (emptyCheck) {
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const body = { income_id: crypto.randomUUID(), id_user: req.userid, income_name: req.body.income_name };
			const nameCheck = await nameIncome(req.userid, false, body.income_name);
			if (nameCheck) {
				res.status(500).json({
					message: 'there are already category with that name, change with another unique name',
					data: { income_name: body.income_name }
				});
			} else {
				await income.create(body);
				res.status(201).json({
					message: 'income data successfully created',
					data: { income_id: body.income_id, income_name: body.income_name }
				});
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.updateIncome = async (req, res) => {
	try {
		const idCheck = await emptyIncomeId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'No income with requested id!',
				data: req.params.id
			});
		} else {
			const emptyCheck = emptyName(req.body.income_name);
			if (emptyCheck) {
				res.status(400).json({
					message: 'Please fill all the required fields!'
				});
			} else {
				const body = { income_name: req.body.income_name };
				const nameCheck = await nameIncome(req.userid, req.params.id, body.income_name);
				if (nameCheck) {
					res.status(500).json({
						message: 'there are already category with that name, change with another unique name',
						data: { income_name: body.income_name }
					});
				} else {
					await income.update(req.params.id, body);
					res.status(200).json({
						message: 'income data successfully updated',
						data: {income_id: req.params.id, ...body}
					});
				};
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.deleteIncome = async (req, res) => {
	try {
		const idCheck = await emptyIncomeId(req.userid, req.params.id); 
		if (!idCheck) {
			res.status(400).json({
				message: 'No income with requested id!',
				data: req.params.id
			});
		} else {
			const deleteCheck = await deleteIncome(req.userid, req.params.id);
			if (deleteCheck) {
				res.status(500).json({
					message: 'cannot delete category that is in use on transactions',
					data: req.params.id
				});
			} else {
				await income.remove(req.params.id);
				res.status(200).json({
					message: 'income data successfully deleted'
				});
			};
		};
	} catch (err) {catchError(err, res)};
};