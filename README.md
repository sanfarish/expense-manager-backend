# Expense Manager

Expense Manager adalah aplikasi web-based untuk membuat dan menyimpan catatan harian transaksi uang.

## Feature

* Mencatat transaksi dengan waktu harian, sampai hitungan menit.
* Dibagi menjadi 3 jenis transaksi, yaitu pemasukan (income), pengeluaran (expense), dan transfer antar akun.
* Memperlihatkan jumlah total transaksi baik pemasukan maupun pengeluaran.
* Memperlihatkan jumlah total saldo akun baik aset (assets) maupun beban (liabilities).
* Saldo akun otomatis bertambah/berkurang seiring adanya transaksi.
* Pemasukan dan pengeluaran dibagi menjadi tiap-tiap kategori untuk memudahkan pencatatan.

## Getting Ready
* Make sure computer have installed: Git

```bash
git clone
cd /server
npm i
cd ../client
npm i
```

## Installation

### Start Server
```bash
cd /server

"c:\Program Files\Git\usr\bin\nano.exe" .env

npx knex migrate:latest
npx knex seed:run
npm start
```

### Start Client
* To run development environment, use code below.
```bash
cd /client
npm start
```

* To run production build, use code below.
```bash
cd /client
npm run build
npm run preview
```

## Usage

## Contributors
* Faris Hasan (Project lead)
* Mariana (UI and Function division)