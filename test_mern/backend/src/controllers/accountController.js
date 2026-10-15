import Account, { DEFAULT_BALANCE_MAP } from '../models/Account.js';

export const getAccounts = async (req, res) => {
  try {
    const { search, type, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { accountCode: { $regex: search,$options: 'i' } },
        { accountName: { $regex: search,$options: 'i' } },
      ];
    }

    if (type) {
      query.accountType = type;
    }

    if (status) {
      query.status = status;
    }

    const accounts = await Account.find(query).sort({ accountCode: 1 });
    return res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Data akun tidak ditemukan' });
    }
    return res.status(200).json({ success: true, data: account });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Format ID tidak valid' });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { accountCode, accountName, accountType, normalBalance, description, status } = req.body;

    if (!accountCode || !accountName || !accountType) {
      return res.status(400).json({
        success: false,
        message: 'Account Code, Account Name, dan Account Type wajib diisi',
      });
    }

    const resolvedBalance = normalBalance || DEFAULT_BALANCE_MAP[accountType] || 'Debit';

    const account = new Account({
      accountCode,
      accountName,
      accountType,
      normalBalance: resolvedBalance,
      description: description || '',
      status: status || 'Active',
    });

    const savedAccount = await account.save();
    return res.status(201).json({ success: true, data: savedAccount });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Account Code '${req.body.accountCode}' sudah terdaftar, gunakan kode lain`,
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { accountCode, accountName, accountType, normalBalance, description, status } = req.body;

    const existingAccount = await Account.findById(req.params.id);
    if (!existingAccount) {
      return res.status(404).json({ success: false, message: 'Data akun tidak ditemukan' });
    }

    if (accountCode && accountCode !== existingAccount.accountCode) {
      const duplicate = await Account.findOne({ accountCode });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Account Code '${accountCode}' sudah digunakan akun lain`,
        });
      }
      existingAccount.accountCode = accountCode;
    }

    if (accountName) existingAccount.accountName = accountName;
    if (accountType) existingAccount.accountType = accountType;
    if (normalBalance) existingAccount.normalBalance = normalBalance;
    if (description !== undefined) existingAccount.description = description;
    if (status) existingAccount.status = status;

    const updatedAccount = await existingAccount.save();
    return res.status(200).json({ success: true, data: updatedAccount });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Account Code sudah digunakan oleh akun lain',
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Data akun tidak ditemukan' });
    }
    return res.status(200).json({ success: true, message: 'Akun berhasil dihapus' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'ID tidak valid' });
  }
};