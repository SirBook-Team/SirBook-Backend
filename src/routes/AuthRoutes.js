import express from 'express';
import authController from '../controllers/AuthController.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    const user = req.user;
    return res.status(200).json(user).end();
});

authRouter.get('/login', async (req, res) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.post('/register', async (req, res) => {
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
