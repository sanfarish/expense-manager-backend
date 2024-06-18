const users = require('../models/users');

exports.getUser = async (req, res) => {
	try {
		const data = await users.findAll();
        res.status(200).send(data);
	} catch (err) {catchError(err, res)};
};