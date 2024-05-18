const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('transactions')
	.select(knex.raw('transaction_id, transaction_time, id_account, A.account_name, id_income, income_name, id_expense, expense_name, id_transfer, B.account_name AS transfer_name, transaction_amount, transaction_note, transaction_bill'))
	.innerJoin(knex.raw('accounts A ON transactions.id_account = A.account_id'))
	.innerJoin('incomes', 'transactions.id_income', '=', 'incomes.income_id')
	.innerJoin('expenses', 'transactions.id_expense', '=', 'expenses.expense_id')
	.innerJoin(knex.raw('accounts B ON transactions.id_transfer = B.account_id'))
	.where('transactions.id_user', userid)
	.orderBy('transaction_time', 'desc')
	.orderBy('updated_at', 'desc');
};

exports.findByID = (userid, id) => {
	return knex('transactions')
	.select(knex.raw('transaction_id, transaction_time, id_account, A.account_name, id_income, income_name, id_expense, expense_name, id_transfer, B.account_name AS transfer_name, transaction_amount, transaction_note, transaction_bill'))
	.innerJoin(knex.raw('accounts A ON transactions.id_account = A.account_id'))
	.innerJoin('incomes', 'transactions.id_income', '=', 'incomes.income_id')
	.innerJoin('expenses', 'transactions.id_expense', '=', 'expenses.expense_id')
	.innerJoin(knex.raw('accounts B ON transactions.id_transfer = B.account_id'))
	.where('transactions.id_user', userid)
	.andWhere('transaction_id', id);
};

exports.create =  async (body) => {
	await knex('transactions').insert(body);
};

exports.update = async (id, body) => {
	await knex('transactions').where('transaction_id', id).update(body);
};

exports.remove = async (id) => {
	await knex('transactions').where('transaction_id', id).del();
};

exports.removeAll = async (userid) => {
	await knex('transactions').where('id_user', userid).del();
};