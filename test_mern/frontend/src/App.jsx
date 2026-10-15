import React, { useState, useEffect } from 'react';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from './services/api';
import AccountFormModal from './components/AccountFormModal';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [notification, setNotification] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetchAccounts({
        search,
        type: filterType,
        status: filterStatus,
      });
      if (res.success) {
        setAccounts(res.data);
      } else {
        showNotification('error', res.message || 'Gagal memuat akun');
      }
    } catch (err) {
      showNotification('error', 'Koneksi ke backend gagal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, [search, filterType, filterStatus]);

  const handleOpenAdd = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (account) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      let res;
      if (editingAccount) {
        res = await updateAccount(editingAccount._id, formData);
      } else {
        res = await createAccount(formData);
      }

      if (res.success) {
        showNotification('success', editingAccount ? 'Akun berhasil diperbarui' : 'Akun berhasil ditambahkan');
        setIsFormOpen(false);
        loadAccounts();
      } else {
        showNotification('error', res.message || 'Gagal menyimpan data');
      }
    } catch (err) {
      showNotification('error', 'Terjadi kesalahan sistem');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAccount(selectedDeleteId);
      if (res.success) {
        showNotification('success', 'Akun berhasil dihapus');
        setIsDeleteOpen(false);
        loadAccounts();
      } else {
        showNotification('error', res.message || 'Gagal menghapus data');
      }
    } catch (err) {
      showNotification('error', 'Terjadi kesalahan koneksi');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h2>Chart of Accounts (COA)</h2>
          <p className="subtitle">Sistem Manajemen Daftar Akun Akuntansi</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Account
        </button>
      </header>

      {notification && (
        <div className={`alert alert-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="filter-card">
        <input
          type="text"
          placeholder="Cari kode atau nama akun..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Semua Tipe</option>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="state-box">Memuat data akun...</div>
        ) : accounts.length === 0 ? (
          <div className="state-box">Tidak ada data akun yang ditemukan.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Account Code</th>
                <th>Account Name</th>
                <th>Type</th>
                <th>Normal Balance</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc._id}>
                  <td className="font-bold">{acc.accountCode}</td>
                  <td>{acc.accountName}</td>
                  <td>
                    <span className={`badge badge-type badge-${acc.accountType.toLowerCase()}`}>
                      {acc.accountType}
                    </span>
                  </td>
                  <td>{acc.normalBalance}</td>
                  <td>
                    <span className={`badge ${acc.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                      {acc.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => handleOpenEdit(acc)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ marginLeft: '8px' }}
                      onClick={() => {
                        setSelectedDeleteId(acc._id);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AccountFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingAccount={editingAccount}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}