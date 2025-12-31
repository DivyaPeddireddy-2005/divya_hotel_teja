import express from "express";
import { getAllHotels, getHotelById, createHotel, updateHotel, getHotelsByOwner } from "../controllers/hotelController.js";

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
};

// Public routes
router.get("/", getAllHotels);
router.get("/:id", getHotelById);

// Protected routes
router.post("/", requireAuth, createHotel);
router.put("/:id", requireAuth, updateHotel);
router.get("/owner/hotels", requireAuth, getHotelsByOwner);

export default router;