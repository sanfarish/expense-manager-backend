const { body, validationResult } = require('express-validator');

const validator = [
	body('user_email').isEmail()
];

const validEmail = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.errors.length !== 0) {
		res.status(401).json({
			// message: 'Email not valid!'
			message: errors.errors
		});
	} else {
		next();
	};
};

module.exports = { validator, validEmail };