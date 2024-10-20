import express from 'express';
import dotenv from 'dotenv';
import router from './routes/rounterConfig';


// Load environment variables
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
