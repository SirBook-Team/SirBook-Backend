import express from 'express';
import User from '../models/User.js';

const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
    res.json({ message: 'Fetching users...' });
});

export default userRouter;
