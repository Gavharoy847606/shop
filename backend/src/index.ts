import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { query } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIX 1: CORS — Render frontend URL ni qo'shing
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.CLIENT_URL || '',
    // 👇 Render deploy qilgan frontend URL ingizni shu yerga qo'shing
    'https://your-frontend-name.onrender.com',
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

// ✅ FIX 2: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// ✅ FIX 3: TypeScript async handler — void return type
app.get('/api/products', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server xatoligi yuz berdi.' });
  }
});

app.post('/api/products', async (req: Request, res: Response): Promise<void> => {
  const { sku, name, quantity, price } = req.body;
  try {
    const result = await query(
      'INSERT INTO products (sku, name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [sku, name, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Mahsulot qoʻshishda xatolik.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
});