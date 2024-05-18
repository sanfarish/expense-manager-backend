const users = require("../models/users");
const { emailUser } = require("../utils/duplicateRules");
const { hashPassword, comparePassword, buildToken } = require("../utils/authHelper");
const { catchError } = require("../utils/errorCatch");

exports.register = async (req, res) => {
	try {
		if (!req.body.user_name || !req.body.user_email || !req.body.user_password) {
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const emailCheck = await emailUser(req.body.user_email);
			if (emailCheck) {
				res.status(500).json({
					message: 'This email has already been used!',
					data: { user_email: req.body.user_email }
				});
			} else {
				const body = {
					user_id: crypto.randomUUID(),
					user_name: req.body.user_name.trim(),
					user_email: req.body.user_email
				};
				const hashedPassword = await hashPassword(req.body.user_password);
				body.user_password = hashedPassword;
				await users.create(body);
				delete body.user_id;
				delete body.user_password;
				res.status(201).json({
					message: 'user registered successfully',
					data: body
				});
			};
		};
	} catch (err) {catchError(err, res)};
};

exports.login = async (req, res) => {
	try {
		if (!req.body.user_email || !req.body.user_password) {
			res.status(400).json({
				message: 'Please fill all the required fields!'
			});
		} else {
			const emailCheck = await emailUser(req.body.user_email);
			if (!emailCheck) {
				res.status(500).json({
					message: 'User not found!',
					data: { user_email: req.body.user_email }
				});
			} else {
				const compare = await comparePassword(req.body.user_email, req.body.user_password);
				if (!compare) {
					res.status(400).json({
						message: 'Password is wrong!'
					});
				} else {
					const accessToken = await buildToken(req.body.user_email);
					res.status(200).json({
						message: 'Successfully logged in!',
						data: { accessToken }
					});
				};
			};
		};
	} catch (err) {catchError(err, res)};
};