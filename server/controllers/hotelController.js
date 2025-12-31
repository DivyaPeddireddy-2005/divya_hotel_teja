import Hotel from "../models/Hotel.js";

// Get all hotels
export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('owner');
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get hotel by ID
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id).populate('owner');
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }
        res.json({ success: true, hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Create hotel (for hotel owners)
export const createHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.auth.userId; // From Clerk middleware

        const hotel = new Hotel({
            name,
            address,
            contact,
            owner,
            city,
        });

        await hotel.save();
        res.json({ success: true, message: "Hotel created successfully", hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update hotel
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const hotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        res.json({ success: true, message: "Hotel updated successfully", hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get hotels by owner
export const getHotelsByOwner = async (req, res) => {
    try {
        const owner = req.auth.userId; // From Clerk middleware
        const hotels = await Hotel.find({ owner });
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};