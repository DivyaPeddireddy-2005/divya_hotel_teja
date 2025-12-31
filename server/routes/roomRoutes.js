import express from "express";
import { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
};

// Public routes
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

// Protected routes (add auth middleware later)
router.post("/", requireAuth, addRoom);
router.put("/:id", requireAuth, updateRoom);
router.delete("/:id", requireAuth, deleteRoom);

export default router;