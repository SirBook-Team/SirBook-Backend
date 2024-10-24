const express = require('express');
const app = express();
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Example route that throws an error
app.get('/', (req, res) => {
  throw new Error('Something went wrong!');
});

app.get('/user', (req, res) => {
  res.send('Hello User!');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});