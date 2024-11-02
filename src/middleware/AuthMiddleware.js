import jwt from 'jsonwebtoken';
import User from '../models/User';
import e from 'express';

// allower routes with no auth
const allowedRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/files/image/:imagename',
    '/api/files/upload',
    '/upload'
];

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsZ2VuZHlAZ21haWwuY29tIiwiaWF0IjoxNzMwNTI0MTg5LCJleHAiOjE3MzA4ODQxODl9.hTa2jM3mC0STn8cUKK3_r1Z8sed9_Vs4hu5uOeNHLBM";
    // ensure route is not in allowed routes
    const isAllowedRoute = allowedRoutes.some(route => {
        const regex = new RegExp(`^${route.replace(':imagename', '[^/]+')}$`);
        return regex.test(req.path);
    });
    
    
    if (isAllowedRoute) {
        return next();
    }

    if (!token) {
        return res.status(401).send('No token provided').end();
    }
    
    try {
        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send(err).end();
            }
            const email = decoded.email;
            const user = await User.findOne({ email });
            
            if (!user) {
                return res.status(401).send('User not found').end();
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status (401).send(error).end();
    }
};
