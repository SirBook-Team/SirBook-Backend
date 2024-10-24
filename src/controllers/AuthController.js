import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { hash } from 'bcrypt';
import { hashPassword } from '../utils/utilsUser.js';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
    async login(req, res) {
        const userData = {
            email: req.body.email,
            hashedPassword: await hashPassword(req.body.password)
        };
        
        const user = await User.findOne(userData)
        
        if (!user) {
            return res.status(401).send('Invalid email or password').end();
        }

        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1hrs' });
        res.cookie('token', token, { httpOnly: true });
        // sent token and user data at json and return status 200
        return res.status(200).json({ token, user }).end();
    }

    async register(req, res) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
        };

        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('passwords do not match');
        }
        
        try {
            const user = await User.createObject(userData);
            if (!user) {
                throw new Error('User not created');
            }
        } catch (error) {
            throw new Error(error.message);
        }

        return res.status(200).send('User created').end();
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.status(200).send('Logged out').end();
    }
}

const authController = new AuthController();
export default authController;
