import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Get all rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel');
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get room by ID
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id).populate('hotel');
        if (!room) {
            return res.json({ success: false, message: "Room not found" });
        }
        res.json({ success: true, room });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Add new room (for hotel owners)
export const addRoom = async (req, res) => {
    try {
        const { hotelId, roomType, pricePerNight, amenities, images } = req.body;

        // Verify hotel ownership
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        // Check if user is the owner (you might want to add Clerk auth check here)
        // For now, assuming the request has user info

        const room = new Room({
            hotel: hotelId,
            roomType,
            pricePerNight,
            amenities,
            images,
        });

        await room.save();
        res.json({ success: true, message: "Room added successfully", room });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update room
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const room = await Room.findByIdAndUpdate(id, updates, { new: true });
        if (!room) {
            return res.json({ success: false, message: "Room not found" });
        }

        res.json({ success: true, message: "Room updated successfully", room });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete room
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.json({ success: false, message: "Room not found" });
        }

        res.json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};