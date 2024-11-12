import express from 'express';
import authController from '../controllers/AuthController.js';

const authRouter = express.Router();

authRouter.get('/', async (req, res) => {
    const user = req.user;
    user.retrive();
    return res.status(200).json(user).end();
});

authRouter.post('/login', async (req, res) => {
    console.log(`Logging in user: ${req.body.email}`);
    try {
        await authController.login(req, res);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.post('/register', async (req, res) => {
    console.log(`Registering user: ${req.body.email}`);
    try {
        await authController.register(req, res);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

authRouter.get('/logout', async (req, res) => {
    try
    {
        await authController.logout(req, res);
    }
    catch (error)
    {
        res.status(401).send(error.message);
    }
});

export default authRouter;
