import express from 'express';
import cors from 'cors';
import accountRoutes from './routes/route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/accounts', accountRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

export default app;