import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

// Create booking
export const createBooking = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate, guests, paymentMethod } = req.body;
        const userId = req.auth.userId; // From Clerk middleware

        const room = await Room.findById(roomId).populate('hotel');
        if (!room) {
            return res.json({ success: false, message: "Room not found" });
        }

        // Calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = room.pricePerNight * nights;

        const booking = new Booking({
            user: userId,
            room: roomId,
            hotel: room.hotel._id,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests,
            paymentMethod,
            isPaid: paymentMethod === 'Stripe', // Assuming Stripe means paid
        });

        await booking.save();
        res.json({ success: true, message: "Booking created successfully", booking });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth.userId; // From Clerk middleware
        const bookings = await Booking.find({ user: userId })
            .populate('room')
            .populate('hotel')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all bookings (for hotel owners)
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('room')
            .populate('hotel')
            .populate('user')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Booking status updated", booking });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};