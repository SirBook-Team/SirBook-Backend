// models/User.js
import { hash } from 'bcrypt';
import { hashPassword } from '../utils/utilsUser';
import BaseModel from './BaseModel';


class User extends BaseModel {
    static name = 'users';

    async validate() {
        super.validate();

        if (!this.email) {
            throw new Error('Email is required');
        }
        if (!this.password) {
            throw new Error('Password is required');
        }
        if (!this.firstname) {
            throw new Error('Firstname is required');
        }
        if (!this.lastname) {
            throw new Error('Lastname is required');
        }
        if (!this.gender) {
            throw new Error('Gender is required');
        }
        if (!this.dateOfBirth) {
            throw new Error('Date of birth is required');
        }

        try {
            await this.setEmail(this.email);
            await this.setPassword(this.password);
            delete this.password;
        } catch (error) {
            throw new Error(`Error validating user: ${error.message}`);
        }

        return true;
    }

    async retrive() {
        if (this.profile && this.profile !== 'Null') {
            this.profile = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/files/image/${this.profile}`;
        } else {
            this.profile = 'https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/files/image/default.jpg';
        }
        delete this.hashedPassword;
            
    }

    static async createObject(params) {
        const user = await this.findOne({email: params.email});
        
        if (user) {
            throw new Error('User already exists');
        }
        return await super.createObject(params);
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
