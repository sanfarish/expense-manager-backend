/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del();
  await knex('accounts').del();
  await knex('incomes').del();
  await knex('expenses').del();
  await knex('users').del();
  await knex('users').insert([
    {user_id: '', user_name: '', user_email: '', user_password: ''},
    {user_id: '08b680c7-3c47-485c-ba81-cf58821cbd7c', user_name: 'Faris Hasan', user_email: 'faris@mail.com', user_password: '$2b$10$G8kU8nv9pejIWW2k3hTGEOPoy3fT0yNq5UuYSqCoYPuX7TlAyDwne'},
    {user_id: 'a43e0896-1f23-478c-9bce-130889686ef4', user_name: 'Mariana', user_email: 'mariana@mail.com', user_password: '$2b$10$zZF80hEQvX87iIsiWSs7MeU0V/QXNZF534lXjjBT4fT8c9RJ1pz46'},
    {user_id: '0409f0ab-8154-469d-8c69-21d8b97685c2', user_name: 'Nur Rifqi', user_email: 'nurrifqi@mail.com', user_password: '$2b$10$bXf/HIL1d7GKNdjNk4.CWuExDQPkpxex.ll2mBnOVZW9TT0Fkkmom'}
  ]);
  await knex('expenses').insert([
    {expense_id: '', id_user: '', expense_name: ''},
    {expense_id: '9749ed15-b5c9-49ad-b7d1-3fb44aae95af', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Hobi'},
    {expense_id: '297e1d19-9988-43f5-a29e-e76121a279ff', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Kebutuhan Rumah'},
    {expense_id: '9c3b186b-063b-4ae3-b0ea-32aeb0f93cf8', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Makan'},
    {expense_id: '8b95e41a-e36d-4263-8981-5bbe0692fb11', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Orang Tua'},
    {expense_id: 'ed1a5774-5ffb-4b69-bb23-29f37758f29a', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Sedekah'},
    {expense_id: '65e11036-3720-497e-9b2a-25f8b2a92ae4', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', expense_name: 'Transport'},
    {expense_id: '4cdb86f1-b2f2-4f96-b15a-5d8ef26c01ee', id_user: 'a43e0896-1f23-478c-9bce-130889686ef4', expense_name: 'Lost Trading'}
  ]);
  await knex('incomes').insert([
    {income_id: '', id_user: '', income_name: ''},
    {income_id: '90074426-86b8-478d-8921-1241f0810729', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', income_name: 'Dropship'},
    {income_id: '5332816f-aa42-4abc-988e-c508a8cfe114', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', income_name: 'Gaji'},
    {income_id: '2f2b29f2-71aa-4a3c-86f9-e48fa1b32aff', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', income_name: 'Reseller'},
    {income_id: '8c72b31b-208c-4423-8eb9-a98e14c2d552', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', income_name: 'Sewa Ruko'},
    {income_id: '32c1ae51-a98d-4824-955e-3d1e691ae2ac', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', income_name: 'Upah Freelance'},
    {income_id: 'a16ff35f-4c5d-41f1-a8de-ac4a8c9733d2', id_user: 'a43e0896-1f23-478c-9bce-130889686ef4', income_name: 'Gain Trading'}
  ]);
  await knex('accounts').insert([
    {account_id: '', id_user: '', account_name: '', account_balance: 0},
    {account_id: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'BNI', account_balance: 5700000},
    {account_id: '281f1213-d4a9-4973-8b1d-aab19e795c39', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'Cash', account_balance: 435000},
    {account_id: 'fe8ead11-b175-4f01-abd7-2c76ba27441f', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'E-Money', account_balance: 0},
    {account_id: '353eac86-ae83-4d28-aec7-f08c40ef80b4', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'Gopay', account_balance: 0},
    {account_id: '02cc7c37-2481-4cee-901c-516402113e6b', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'Hutang', account_balance: -1300000},
    {account_id: 'd75d8fe3-a984-4318-9f6c-ca7699501e93', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'Mandiri', account_balance: 0},
    {account_id: '1aa35acc-33b4-4770-aa32-fba0511a41eb', id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c', account_name: 'Shopeepay', account_balance: 0},
    {account_id: '5ae7b8b3-ea95-4f7c-8972-c39490741adc', id_user: 'a43e0896-1f23-478c-9bce-130889686ef4', account_name: 'RDN BCA', account_balance: 20000000}
  ]);
  await knex('transactions').insert([
    {
      transaction_id: 'e863441a-0e53-4671-9dae-2625fb7b4873',
      id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
      transaction_time: '2024-03-01T06:00',
      id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
      id_income: '5332816f-aa42-4abc-988e-c508a8cfe114',
      id_expense: '',
      id_transfer: '',
      transaction_amount: 6500000,
      transaction_note: 'Gaji pertama sebagai software engineer',
      transaction_bill: 'expense_manager/1715231546006-825311226_dd0ula'
    },
    {
      transaction_id: 'a567ca38-c0c3-4de5-bbe1-baa53b3f5253',
      id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
      transaction_time: '2024-03-01T11:30',
      id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
      id_income: '',
      id_expense: '',
      id_transfer: '281f1213-d4a9-4973-8b1d-aab19e795c39',
      transaction_amount: 800000,
      transaction_note: 'Tarik tunai buat pegangan cash',
      transaction_bill: ''
    },
    {
      transaction_id: '131189c7-a5a7-42da-98d9-4abc1ab5dff0',
      id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
      transaction_time: '2024-03-02T18:30',
      id_account: '281f1213-d4a9-4973-8b1d-aab19e795c39',
      id_income: '',
      id_expense: '9c3b186b-063b-4ae3-b0ea-32aeb0f93cf8',
      id_transfer: '',
      transaction_amount: 300000,
      transaction_note: 'Traktiran selesai kontrak dari freelance drafter',
      transaction_bill: 'expense_manager/1715231613942-101085425_q4thbl'
    },
    {
      transaction_id: 'c65d054e-9d53-4bfd-a19f-f0b22bb0bf96',
      id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
      transaction_time: '2024-03-03T07:00',
      id_account: '02cc7c37-2481-4cee-901c-516402113e6b',
      id_income: '',
      id_expense: '65e11036-3720-497e-9b2a-25f8b2a92ae4',
      id_transfer: '',
      transaction_amount: 1300000,
      transaction_note: 'Minjem rekan buat pesawat pulang',
      transaction_bill: 'expense_manager/1715231698901-240772897_ret5oh'
    },
    {
      transaction_id: '1671ae23-2e24-4b4f-924a-355c336abdcc',
      id_user: '08b680c7-3c47-485c-ba81-cf58821cbd7c',
      transaction_time: '2024-03-04T01:00',
      id_account: '281f1213-d4a9-4973-8b1d-aab19e795c39',
      id_income: '',
      id_expense: '297e1d19-9988-43f5-a29e-e76121a279ff',
      id_transfer: '',
      transaction_amount: 65000,
      transaction_note: 'Beli 3 galon air',
      transaction_bill: ''
    },
    {
      transaction_id: 'd0b91a1f-39f6-4cab-8cd8-5fcd6098ada7',
      id_user: 'a43e0896-1f23-478c-9bce-130889686ef4',
      transaction_time: '2024-04-27T05:00',
      id_account: '5ae7b8b3-ea95-4f7c-8972-c39490741adc',
      id_income: 'a16ff35f-4c5d-41f1-a8de-ac4a8c9733d2',
      id_expense: '',
      id_transfer: '',
      transaction_amount: 30000000,
      transaction_note: 'Sell saham ADRO',
      transaction_bill: ''
    },
    {
      transaction_id: 'e33a7bfa-3153-4008-b404-73766e4a5ef7',
      id_user: 'a43e0896-1f23-478c-9bce-130889686ef4',
      transaction_time: '2024-04-28T05:00',
      id_account: '5ae7b8b3-ea95-4f7c-8972-c39490741adc',
      id_income: '',
      id_expense: '4cdb86f1-b2f2-4f96-b15a-5d8ef26c01ee',
      id_transfer: '',
      transaction_amount: 10000000,
      transaction_note: 'Buy saham ACES',
      transaction_bill: ''
    }
  ]);
};