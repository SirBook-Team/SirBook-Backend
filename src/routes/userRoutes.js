import express from 'express';
import User from '../models/User.js';
import {upload} from '../utils/utilsImage.js'

const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
    res.json({ message: 'Fetching users...' });
});

userRouter.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.status(200).send(user);
    }
});


userRouter.post('/profile', upload.single('profile'), async (req, res) => {
    const data = req.body;
    console.log(req.image);
    try {
        const user = req.user;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.dateOfBirth = data.dateOfBirth;
        user.phoneNumber = data.phoneNumber;
        user.profile = req.image;
        await user.update();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default userRouter;
