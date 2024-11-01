import express from 'express';
import path from 'path';

const fileRouter = express.Router();



fileRouter.get('/image/:imagename', (req, res) => {
    const imageName = req.params.imagename;
    const imagePath = path.join(__dirname, '../', 'public', imageName);
    
    res.sendFile(imagePath, (err) => {
    if (err) {
        res.status(404).send('Image not found');
    }
    });
  });


export default fileRouter;
