import mongoose from 'mongoose';

export const ACCOUNT_TYPES = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];
export const NORMAL_BALANCES = ['Debit', 'Credit'];
export const DEFAULT_BALANCE_MAP = {
  Asset: 'Debit',
  Liability: 'Credit',
  Equity: 'Credit',
  Revenue: 'Credit',
  Expense: 'Debit',
};

const accountSchema = new mongoose.Schema(
  {
    accountCode: {
      type: String,
      required: [true, 'Account Code wajib diisi'],
      unique: true,
      trim: true,
    },
    accountName: {
      type: String,
      required: [true, 'Account Name wajib diisi'],
      trim: true,
    },
    accountType: {
      type: String,
      required: [true, 'Account Type wajib diisi'],
      enum: {
        values: ACCOUNT_TYPES,
        message: '{VALUE} bukan tipe akun yang valid',
      },
    },
    normalBalance: {
      type: String,
      required: [true, 'Normal Balance wajib diisi'],
      enum: {
        values: NORMAL_BALANCES,
        message: '{VALUE} harus Debit atau Credit',
      },
      default: function () {
        return DEFAULT_BALANCE_MAP[this.accountType] || 'Debit';
      },
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Account', accountSchema);