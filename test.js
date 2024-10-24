// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Route to serve images dynamically
app.get('/image/:imagename', (req, res) => {
  const imageName = req.params.imagename;
  const imagePath = path.join(__dirname, 'public', imageName);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});