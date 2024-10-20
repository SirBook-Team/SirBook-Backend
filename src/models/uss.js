// models/User.js
import axios from 'axios';
import { hashPassword } from '../utils/utilsUser';

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || 'http://localhost:5000';

class User {
    #username;
    #hashedPassword;
    #email;

    async creatUser( username, password, email) {
        const user = new User();
        await user.setUserName(username);
        await user.setPassword(password);
        await user.setEmail(email);

        const response = await axios.post(`${PYTHON_SERVER_URL}/users`, {
            username: user.username,
            password: user.hashedPassword,
            email: user.email
        });

        if (response.status !== 201) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    async setPassword(password) {
        if (!password) {
            throw new Error('Password is required');
        }
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        let number = /\d/.test(password);
        let lower = /[a-z]/.test(password);
        let upper = /[A-Z]/.test(password);
        let special = /[^A-Za-z0-9]/.test(password);
        if (!number || !lower || !upper || !special) {
            throw new Error('Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character');
        }
        this.hashedPassword = await hashPassword(password);
    }

    async setUserName(username) {
        if (!username) {
            throw new Error('Username is required');
        }
        if (username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }
        this.username = username;
    }

    async setEmail(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        if (!email.includes('@')) {
            throw new Error('Email must contain an @ symbol');
        }
        this.email = email;
    }
}

export default User;