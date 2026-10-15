import React, { useState, useEffect } from 'react';

const DEFAULT_BALANCES = {
  Asset: 'Debit',
  Liability: 'Credit',
  Equity: 'Credit',
  Revenue: 'Credit',
  Expense: 'Debit',
};

export default function AccountFormModal({ isOpen, onClose, onSubmit, editingAccount }) {
  const [formData, setFormData] = useState({
    accountCode: '',
    accountName: '',
    accountType: 'Asset',
    normalBalance: 'Debit',
    description: '',
    status: 'Active',
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (editingAccount) {
      setFormData({
        accountCode: editingAccount.accountCode || '',
        accountName: editingAccount.accountName || '',
        accountType: editingAccount.accountType || 'Asset',
        normalBalance: editingAccount.normalBalance || 'Debit',
        description: editingAccount.description || '',
        status: editingAccount.status || 'Active',
      });
    } else {
      setFormData({
        accountCode: '',
        accountName: '',
        accountType: 'Asset',
        normalBalance: 'Debit',
        description: '',
        status: 'Active',
      });
    }
    setErrorMsg('');
  }, [editingAccount, isOpen]);

  if (!isOpen) return null;

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      accountType: newType,
      normalBalance: DEFAULT_BALANCES[newType] || 'Debit',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accountCode.trim() || !formData.accountName.trim()) {
      setErrorMsg('Account Code dan Account Name tidak boleh kosong!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{editingAccount ? 'Edit Account' : 'Add New Account'}</h3>
        {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Account Code *</label>
            <input
              type="text"
              required
              value={formData.accountCode}
              onChange={(e) => setFormData({ ...formData, accountCode: e.target.value })}
              placeholder="Contoh: 1101"
            />
          </div>

          <div className="form-group">
            <label>Account Name *</label>
            <input
              type="text"
              required
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Contoh: Cash"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Account Type *</label>
              <select value={formData.accountType} onChange={handleTypeChange}>
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div className="form-group">
              <label>Normal Balance *</label>
              <select
                value={formData.normalBalance}
                onChange={(e) => setFormData({ ...formData, normalBalance: e.target.value })}
              >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Catatan tambahan (opsional)"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}