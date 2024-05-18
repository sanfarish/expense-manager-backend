const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('incomes')
	.select('income_id', 'income_name')
	.where('id_user', userid)
	.orderBy('income_name', 'asc');
};

exports.create =  async (body) => {
	await knex('incomes').insert(body);
};

exports.update = async (id, body) => {
	await knex('incomes').where('income_id', id).update(body);
};

exports.remove = async (id) => {
	await knex('incomes').where('income_id', id).del();
};

exports.removeAll = async (userid) => {
	await knex('incomes').where('id_user', userid).del();
};