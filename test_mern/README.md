# Test MERN – Chart of Accounts (COA)

Aplikasi CRUD sederhana **Chart of Accounts** (daftar akun akuntansi).

## Fitur

- Menampilkan daftar akun (urut berdasarkan Account Code)
- Pencarian berdasarkan kode / nama akun
- Filter berdasarkan **Account Type** dan **Status**
- Tambah, edit, dan hapus akun (dengan modal konfirmasi)
- Normal Balance otomatis menyesuaikan Account Type
- Validasi Account Code unik

| Account Type | Default Normal Balance |
| ------------ | ---------------------- |
| Asset        | Debit                  |
| Liability    | Credit                 |
| Equity       | Credit                 |
| Revenue      | Credit                 |
| Expense      | Debit                  |

## Struktur Folder

```
test_mern/
├── backend/
│   ├── server.js              # Entry point (load .env, koneksi DB, listen)
│   ├── .env
│   └── src/
│       ├── app.js             # Setup Express, CORS, routes
│       ├── config/db.js       # Koneksi MongoDB (mongoose)
│       ├── models/Account.js
│       ├── controllers/accountController.js
│       └── routes/route.js
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── services/api.js
        └── components/
            ├── AccountFormModal.jsx
            └── ConfirmModal.jsx
```

## Prasyarat

- **Node.js** v18+
- **MongoDB**, pilih salah satu:
  - MongoDB Community Server lokal (berjalan di `127.0.0.1:27017`), atau
  - MongoDB Atlas (cloud)

## Instalasi & Menjalankan

### 1. Backend

```bash
cd backend
npm install
```

Buat / sesuaikan file `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/db_indoland
# atau Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/db_indoland
```

Jalankan:

```bash
npm run dev     # mode development (nodemon)
# atau
npm start
```

Jika berhasil akan muncul:

```
MongoDB Connected: ...
Server berjalan di http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Buka **http://localhost:5173**

> Frontend memanggil API di `http://localhost:5000/api/accounts` (lihat `frontend/src/services/api.js`).

## API Endpoints

Base URL: `http://localhost:5000/api/accounts`

| Method | Endpoint | Keterangan |
| ------ | -------- | ---------- |
| GET    | `/`      | List akun. Query opsional: `search`, `type`, `status` |
| GET    | `/:id`   | Detail akun |
| POST   | `/`      | Tambah akun |
| PUT    | `/:id`   | Update akun |
| DELETE | `/:id`   | Hapus akun |

### Contoh Request Body (POST / PUT)

```json
{
  "accountCode": "1101",
  "accountName": "Cash",
  "accountType": "Asset",
  "normalBalance": "Debit",
  "description": "Kas perusahaan",
  "status": "Active"
}
```

### Format Response

```json
{ "success": true, "data": { ... } }
```

```json
{ "success": false, "message": "Account Code '1101' sudah terdaftar, gunakan kode lain" }
```

## Troubleshooting

| Masalah | Penyebab & Solusi |
| ------- | ----------------- |
| `Database Connection Error: connect ECONNREFUSED 127.0.0.1:27017` | MongoDB belum berjalan. Jalankan service MongoDB atau gunakan URI Atlas di `.env`. |
| Frontend: `ERR_CONNECTION_REFUSED` ke port 5000 / "Terjadi kesalahan sistem" | Backend tidak berjalan (biasanya karena gagal konek DB). Cek terminal backend. |
| `Cannot find module .../backend/server.js` | Pastikan `server.js` berada di root folder `backend/`. |
