/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .dropTableIfExists('transactions')
  .dropTableIfExists('accounts')
  .dropTableIfExists('incomes')
  .dropTableIfExists('expenses')
  .dropTableIfExists('users')
  .createTable('users', (table) => {
    table.string('user_id', 36).notNullable().primary();
    table.string('user_name').notNullable();
    table.string('user_email').notNullable();
    table.string('user_password').notNullable();
  })
  .createTable('expenses', (table) => {
      table.string('expense_id', 36).notNullable().primary();
      table.string('id_user', 36).notNullable();
      table.string('expense_name').notNullable();
      table.foreign('id_user').references('user_id').inTable('users');
  })
  .createTable('incomes', (table) => {
      table.string('income_id', 36).notNullable().primary();
      table.string('id_user', 36).notNullable();
      table.string('income_name').notNullable();
      table.foreign('id_user').references('user_id').inTable('users');
  })
  .createTable('accounts', (table) => {
      table.string('account_id', 36).notNullable().primary();
      table.string('id_user', 36).notNullable();
      table.string('account_name').notNullable();
      table.integer('account_balance').notNullable();
      table.foreign('id_user').references('user_id').inTable('users');
  })
  .createTable('transactions', (table) => {
      table.string('transaction_id', 36).notNullable().primary();
      table.string('id_user', 36).notNullable();
      table.timestamp('transaction_time').notNullable();
      table.string('id_account', 36).notNullable();
      table.string('id_income', 36).notNullable();
      table.string('id_expense', 36).notNullable();
      table.string('id_transfer', 36).notNullable();
      table.integer('transaction_amount').notNullable();
      table.string('transaction_note');
      table.string('transaction_bill');
      table.timestamps(true, true);
      table.foreign('id_account').references('account_id').inTable('accounts');
      table.foreign('id_income').references('income_id').inTable('incomes');
      table.foreign('id_expense').references('expense_id').inTable('expenses');
      table.foreign('id_transfer').references('account_id').inTable('accounts');
      table.foreign('id_user').references('user_id').inTable('users');
  })
  .then( () => {
    return knex('users').insert([
      {user_id: '', user_name: '', user_email: '', user_password: ''}
    ]);
  })
  .then( () => {
    return knex('expenses').insert([
      {expense_id: '', id_user: '', expense_name: ''}
    ]);
  })
  .then( () => {
    return knex('incomes').insert([
      {income_id: '', id_user: '', income_name: ''}
    ]);
  })
  .then( () => {
    return knex('accounts').insert([
      {account_id: '', id_user: '', account_name: '', account_balance: 0}
    ]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('transactions')
  .dropTableIfExists('accounts')
  .dropTableIfExists('incomes')
  .dropTableIfExists('expenses')
  .dropTableIfExists('users');
};