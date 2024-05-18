const transaction = require('../models/transactions');
const { emptyTransaction, emptyTransactionId } = require('../utils/emptyRules');
const { multipleRule, idRule } = require('../utils/transactionRules');
const { bodyAppend, addBalance, removeBalance } = require('../utils/transactionHelper');
const { deletePath, deleteTemp } = require('../utils/tempHelper');
const { cloudinaryUpload, cloudinaryDestroy } = require('../utils/cloudinaryHelper');
const { catchError } = require('../utils/errorCatch');

exports.getTransactions = async (req, res) => {
	try {
		const data = await transaction.findAll(req.userid);
		const mod = data.map(item => {
			if (item.transaction_bill !== '') {
				item.transaction_bill = process.env.C_PATH + item.transaction_bill;
			};
			return item;
		});
		res.status(200).send(mod);
	} catch (err) {catchError(err, res)};
};

exports.createTransaction = async (req, res) => {
	try {
		const emptyCheck = emptyTransaction(req.body);
		if (emptyCheck) {
			if (req.file) {
				deleteTemp(req.file.path);
			};
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const crossCheck = multipleRule(req.body);
			if (crossCheck) {
				if (req.file) {
					deleteTemp(req.file.path);
				};
				res.status(400).json({
					message: 'only accept one type of transaction either income, expense, or transfer'
				});
			} else {
				const idTypeCheck = await idRule(req.userid, req.body);
				if (idTypeCheck) {
					if (req.file) {
						deleteTemp(req.file.path);
					};
					res.status(400).json({
						message: 'there are no account or category data with requested id'
					});
				} else {
					if (req.body.id_account === req.body.id_transfer) {
						if (req.file) {
							deleteTemp(req.file.path);
						};
						res.status(400).json({
							status: 400,
							message: '\"from\" account and \"to\" account cannot be the same',
							data: { id_account: req.body.id_account, id_transfer: req.body.id_transfer }
						});
					} else {
						const body = {
							transaction_id: crypto.randomUUID(),
							id_user: req.userid,
							transaction_time: req.body.transaction_time,
							id_account: req.body.id_account,
							transaction_amount: Number(req.body.transaction_amount),
							transaction_note: '',
							transaction_bill: ''
						};
						if (req.body.transaction_note) {
							body.transaction_note = req.body.transaction_note;
						};
						if (req.file) {
							const cloud = await cloudinaryUpload(req.file.path);
							body.transaction_bill = cloud.public_id;
							deleteTemp(req.file.path);
						};
						const newBody = bodyAppend(req.body, body);
						await addBalance(req.userid, newBody);
						await transaction.create(newBody);
						delete newBody.id_user;
						res.status(201).json({
							status: 201,
							message: 'transaction data successfully created',
							data: newBody
						});
					};
				};
			};
		};
	} catch (err) {
		if (req.file) {
			deleteTemp(req.file.path);
		};
		catchError(err, res);
	};
};

exports.updateTransaction = async (req, res) => {
	try {
		const idCheck = await emptyTransactionId(req.userid, req.params.id);
		if (!idCheck) {
			if (req.file) {
				deleteTemp(req.file.path);
			};
			res.status(400).json({
				message: 'There are no transaction data with requested id!',
				data: req.params.id
			});
		} else {
			const emptyCheck = emptyTransaction(req.body);
			if (emptyCheck) {
				if (req.file) {
					deleteTemp(req.file.path);
				};
				res.status(400).json({
					message: 'Please fill all the required fields!'
				});
			} else {
				const crossCheck = multipleRule(req.body);
				if (crossCheck) {
					if (req.file) {
						deleteTemp(req.file.path);
					};
					res.status(400).json({
						message: 'only accept one type of transaction either income, expense, or transfer'
					});
				} else {
					const idTypeCheck = await idRule(req.userid, req.body);
					if (idTypeCheck) {
						if (req.file) {
							deleteTemp(req.file.path);
						};
						res.status(400).json({
							message: 'there are no account and / or category data with requested id'
						});
					} else {
						if (req.body.id_account === req.body.id_transfer) {
							if (req.file) {
								deleteTemp(req.file.path);
							};
							res.status(500).json({
								status: 500,
								message: '"from" account and "to" account cannot be the same',
								data: { id_account: req.body.id_account, id_transfer: req.body.id_transfer }
							});
						} else {
							const body = {
								transaction_time: req.body.transaction_time,
								id_account: req.body.id_account,
								transaction_amount: Number(req.body.transaction_amount)
							};
							if (req.body.transaction_note) {
								body['transaction_note'] = req.body.transaction_note;
							} else {
								body['transaction_note'] = '';
							};
							if (req.body.transaction_bill === '' && !req.file) {
								const deleteCheck = await deletePath(req.userid, req.params.id);
								if (deleteCheck) {
									await cloudinaryDestroy(deleteCheck);
								};
								body['transaction_bill'] = '';
							} else if (!req.body.transaction_bill && req.file) {
								const deleteCheck = await deletePath(req.userid, req.params.id);
								if (deleteCheck) {
									await cloudinaryDestroy(deleteCheck);
								};
								const cloud = await cloudinaryUpload(req.file.path);
								body['transaction_bill'] = cloud.public_id;
								deleteTemp(req.file.path);
							};
							const newBody = bodyAppend(req.body, body);
							await removeBalance(req.userid, req.params.id);
							await addBalance(req.userid, newBody);
							await transaction.update(req.params.id, newBody);
							res.status(200).json({
								status: 200,
								message: 'transaction data successfully updated',
								data: { transaction_id: req.params.id, ...newBody }
							});
						};
					};
				};
			};
		};
	} catch (err) {
		if (req.file) {
			deleteTemp(req.file.path);
		};
		catchError(err, res)
	};
};

exports.deleteTransaction = async (req, res) => {
	try {
		const idCheck = await emptyTransactionId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'There are no transaction data with requested id!',
				data: req.params.id
			});
		} else {
			const deleteCheck = await deletePath(req.userid, req.params.id);
			if (deleteCheck) {
				await cloudinaryDestroy(deleteCheck);
			};
			await removeBalance(req.userid, req.params.id);
			await transaction.remove(req.params.id);
			res.status(200).json({
				message: 'transaction data successfully deleted'
			});
		};
	} catch (err) {catchError(err, res)};
};