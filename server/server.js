import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

import notFoundMiddleware from './middleware/not-found.js';
import serverErrorMiddleware from './middleware/server-error.js';

import authRouter from './routers/auth.js';
import itemRouter from './routers/items.js';
import cartRouter from './routers/cart.js';
import orderRouter from './routers/orders.js';
import addressRouter from './routers/addresses.js';

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/items', itemRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/addresses', addressRouter);

// static resource section
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('', (req, res) =>
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
);
app.get('*', (req, res) => res.redirect('/'));
// static resource section end

app.use(notFoundMiddleware);
app.use(serverErrorMiddleware);

import connectDB from './db/connect.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (error) {
    throw error;
  }
};

start();
