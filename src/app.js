import express from 'express';
import dotenv from 'dotenv';
import router from './routes/rounterConfig';
import cokkieParser from 'cookie-parser';
import { authMiddleware } from './middleware/AuthMiddleware';
import cors from 'cors';


dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3000;

const dataMildware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const link = req.path;
  const meth = req.method;
  const isToken = token ? true : false;
  console.log(`Link: ${link}, Method: ${meth}, Token: ${isToken}`);
  next();
}

// Error-handling middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cokkieParser());
app.use(dataMildware);
app.use(authMiddleware);
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
