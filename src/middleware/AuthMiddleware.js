import jwt from 'jsonwebtoken';
import User from '../models/User';

// allower routes with no auth
const allowedRoutes = [
    '/api/auth/login',
    '/api/auth/register'
];

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    // ensure route is not in allowed routes
    if (allowedRoutes.includes(req.path) || 1) {
        return next();
    }
    
    if (!token) {
        return res.status(401).send('No token provided').end();
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send(err).end();
        }
        const email = decoded.email;
        const user = User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not found').end();
        }
        req.user = user;
        next();
    });
};
