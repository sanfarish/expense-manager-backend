const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('users').select('*').whereNot('user_id', '=', '').orderBy('user_name', 'asc');
};

exports.findByID = (userid) => {
	return knex('users').select('user_name', 'user_email').where('user_id', userid);
};

exports.create =  async (body) => {
	await knex('users').insert(body);
};

exports.update = async (userid, body) => {
	await knex('users').where('user_id', userid).update(body);
};

exports.remove = async (userid) => {
	await knex('users').where('user_id', userid).del();
};