const express = require('express');
const router = express.Router();
const { authorization, fileUpload } = require('../middlewares');
const transaction = require('../controllers/transactions');
const account = require('../controllers/accounts');
const income = require('../controllers/incomes');
const expense = require('../controllers/expenses');
const user = require('../controllers/users');

router.get('/transactions', authorization, transaction.getTransactions);
router.post('/transactions', authorization, fileUpload('transaction_bill'), transaction.createTransaction);
router.put('/transactions/:id', authorization, fileUpload('transaction_bill'), transaction.updateTransaction);
router.delete('/transactions/:id', authorization, transaction.deleteTransaction);

router.get('/accounts', authorization, account.getAccounts);
router.post('/accounts', authorization, account.createAccount);
router.put('/accounts/:id', authorization, account.updateAccount);
router.delete('/accounts/:id', authorization, account.deleteAccount);

router.get('/incomes', authorization, income.getIncomes);
router.post('/incomes', authorization, income.createIncome);
router.put('/incomes/:id', authorization, income.updateIncome);
router.delete('/incomes/:id', authorization, income.deleteIncome);

router.get('/expenses', authorization, expense.getExpenses);
router.post('/expenses', authorization, expense.createExpense);
router.put('/expenses/:id', authorization, expense.updateExpense);
router.delete('/expenses/:id', authorization, expense.deleteExpense);

router.get('/users', authorization, user.getUser);
router.put('/users', authorization, user.updateUser);
router.delete('/users', authorization, user.deleteUser);

module.exports = router;