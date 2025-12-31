import { clerkMiddleware } from "@clerk/express";

// Middleware to add userId to req
const authMiddleware = (req, res, next) => {
    try {
        // Clerk middleware should have set req.auth
        if (req.auth && req.auth.userId) {
            req.userId = req.auth.userId;
        }
        next();
    } catch (error) {
        next();
    }
};

export default authMiddleware;