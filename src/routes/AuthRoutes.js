import express from 'express';
import authController from '../controllers/AuthController.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    const user = req.user;
    return res.status(200).json(user).end();
});

authRouter.get('/login', (req, res) => {
    authController.login(req, res);
});

authRouter.post('/register', async (req, res) => {
    authController.register(req, res);
});

authRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

export default authRouter;
