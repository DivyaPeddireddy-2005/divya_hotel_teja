import express from "express";
import { createBooking, getUserBookings, getAllBookings, updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
};

// Protected routes
router.post("/", requireAuth, createBooking);
router.get("/user", requireAuth, getUserBookings);
router.get("/", requireAuth, getAllBookings);
router.put("/:id/status", requireAuth, updateBookingStatus);

export default router;