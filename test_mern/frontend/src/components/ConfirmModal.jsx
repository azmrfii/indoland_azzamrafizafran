import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-sm">
        <h3>Konfirmasi Hapus</h3>
        <p>{message || 'Apakah Anda yakin ingin menghapus data akun ini?'}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}