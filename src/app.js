import express from 'express';
import dotenv from 'dotenv';
import router from './routes/rounterConfig';
import cokkieParser from 'cookie-parser';
import { authMiddleware } from './middleware/AuthMiddleware';
import cors from 'cors';


dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3000;


// Error-handling middleware

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cokkieParser());
app.use(authMiddleware);
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
