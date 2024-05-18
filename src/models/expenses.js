const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('expenses')
	.select('expense_id', 'expense_name')
	.where('id_user', userid)
	.orderBy('expense_name', 'asc');
};

exports.create =  async (body) => {
	await knex('expenses').insert(body);
};

exports.update = async (id, body) => {
	await knex('expenses').where('expense_id', id).update(body);
};

exports.remove = async (id) => {
	await knex('expenses').where('expense_id', id).del();
};

exports.removeAll = async (userid) => {
	await knex('expenses').where('id_user', userid).del();
};