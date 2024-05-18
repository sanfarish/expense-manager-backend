const account = require('../models/accounts');
const { nameAccount } = require('../utils/duplicateRules');
const { deleteAccount } = require('../utils/deleteRules');
const { emptyName, emptyBalance, emptyAccountId } = require('../utils/emptyRules');
const { catchError } = require('../utils/errorCatch');

exports.getAccounts = async (req, res) => {
	try {
		const data = await account.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {catchError(err, res)};
};

exports.createAccount = async (req, res) => {
	try {
		const emptyCheck = emptyName(req.body.account_name);
		if (emptyCheck) {
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const nameCheck = await nameAccount(req.userid, false, req.body.account_name);
			if (nameCheck) {
				res.status(500).json({
					message: 'This account name is already existed!',
					data: { account_name: req.body.account_name }
				});
			} else {
				const body = {
					account_id: crypto.randomUUID(),
					id_user: req.userid,
					account_name: req.body.account_name,
					account_balance: 0
				};
				await account.create(body);
				res.status(201).json({
					message: 'account data successfully created',
					data: { account_id: body.account_id, account_name: body.account_name }
				});
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.updateAccount = async (req, res) => {
	try {
		const idCheck = await emptyAccountId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'No account with requested id!',
				data: req.params.id
			});
		} else {
			const emptyCheckName = emptyName(req.body.account_name);
			const emptyCheckBal = emptyBalance(req.body.account_balance);
			if (emptyCheckName && emptyCheckBal) {
				res.status(400).json({
					message: 'Please fill all the required fields!'
				});
			} else if (emptyCheckBal) {
				const body = { account_name: req.body.account_name };
				const nameCheck = await nameAccount(req.userid, req.params.id, req.body.account_name);
				if (nameCheck) {
					res.status(500).json({
						message: 'This account name is already existed!',
						data: { account_name: body.account_name }
					});
				} else {
					await account.update(req.params.id, body);
					res.status(200).json({
						message: 'account data successfully updated',
						data: { account_id: req.params.id, ...body }
					});
				};
			} else if (emptyCheckName) {
				const body = { account_balance: req.body.account_balance };
				await account.update(req.params.id, body);
				res.status(200).json({
					message: 'account data successfully updated.',
					data: { account_id: req.params.id, ...body }
				});
			} else {
				res.status(400).json({
					message: 'Only accept one parameter to update!'
				});
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.deleteAccount = async (req, res) => {
	try {
		const idCheck = await emptyAccountId(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'No account with requested id!',
				data: req.params.id
			});
		} else {
			const deleteCheck = await deleteAccount(req.userid, req.params.id);
			if (deleteCheck) {
				res.status(500).json({
					message: 'Cannot delete account that is in use on transactions!',
					data: req.params.id
				});
			} else {
				await account.remove(req.params.id);
				res.status(200).json({
					message: 'account data successfully deleted'
				});
			};
		};
	} catch (err) {catchError(err, res)};
};