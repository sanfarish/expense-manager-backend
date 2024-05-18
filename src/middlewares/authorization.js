const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
	const bearerToken = req.get('Authorization');
	if (!bearerToken) {
		res.status(401).json({
			message: 'authorization required'
		});
	} else {
		const token =  bearerToken.split(' ')[1];
		if (token === null) {
			res.status(401).json({
				message: 'authorization required'
			});
		} else {
			try {
				const payload = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
				req.userid = payload.user_id;
				next();
			} catch (err) {
				res.status(401).json({
					message: 'authorization required'
				});
			};
		};
	};
};

module.exports = authorization;