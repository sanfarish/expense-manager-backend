const transactions = require('../models/transactions');
const fs = require('fs');

exports.deleteTemp = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};

exports.deletePath = async (userid, id) => {
	const res = await transactions.findByID(userid, id);
	if (res[0].transaction_bill !== '') {
		return res[0].transaction_bill;
	} else {
		return false;
	};
};