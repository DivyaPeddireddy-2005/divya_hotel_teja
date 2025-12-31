// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Rooms API
export const roomsAPI = {
    getAll: () => apiRequest('/api/rooms'),
    getById: (id) => apiRequest(`/api/rooms/${id}`),
    create: (roomData) => apiRequest('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData),
    }),
    update: (id, roomData) => apiRequest(`/api/rooms/${id}`, {
        method: 'PUT',
        body: JSON.stringify(roomData),
    }),
    delete: (id) => apiRequest(`/api/rooms/${id}`, {
        method: 'DELETE',
    }),
};

// Bookings API
export const bookingsAPI = {
    create: (bookingData) => apiRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    }),
    getUserBookings: () => apiRequest('/api/bookings/user'),
    getAllBookings: () => apiRequest('/api/bookings'),
    updateStatus: (id, status) => apiRequest(`/api/bookings/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
};

// Hotels API
export const hotelsAPI = {
    getAll: () => apiRequest('/api/hotels'),
    getById: (id) => apiRequest(`/api/hotels/${id}`),
    create: (hotelData) => apiRequest('/api/hotels', {
        method: 'POST',
        body: JSON.stringify(hotelData),
    }),
    update: (id, hotelData) => apiRequest(`/api/hotels/${id}`, {
        method: 'PUT',
        body: JSON.stringify(hotelData),
    }),
    getOwnerHotels: () => apiRequest('/api/hotels/owner/hotels'),
};

export default {
    rooms: roomsAPI,
    bookings: bookingsAPI,
    hotels: hotelsAPI,
};