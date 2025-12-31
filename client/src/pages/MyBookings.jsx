import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { bookingsAPI } from '../utils/api'
import { useUser } from '@clerk/clerk-react'

const MyBookings = () => {
  const { isSignedIn } = useUser()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isSignedIn) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await bookingsAPI.getUserBookings()
        if (response.success) {
          setBookings(response.bookings)
        } else {
          setError('Failed to load bookings')
        }
      } catch (err) {
        setError('Failed to load bookings. Please try again later.')
        console.error('Error fetching bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isSignedIn])

  if (!isSignedIn) {
    return (
      <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">
          <Title
            title="My Bookings"
            subTitle="Please sign in to view your bookings"
            align="center"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      {loading ? (
        <div className="text-center mt-8">Loading bookings...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="max-w-6xl mt-8 w-full text-gray-800">
          <div className="hidden md:grid md:grid-cols-3 w-full border-b border-gray-300 font-medium text-base py-3">
            <div>Hotels</div>
            <div>Date & Time</div>
            <div>Payment</div>
          </div>

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-gray-300 py-6 first:border-t"
            >
              {/* Hotel Info */}
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.room?.images?.[0] || assets.roomImg1}
                  alt="hotel-img"
                  className="md:w-44 rounded shadow object-cover"
                />
                <div className="flex flex-col gap-1.5 mt-3 md:ml-4">
                  <p className="font-playfair text-2xl whitespace-nowrap">
                    {booking.hotel?.name || 'Hotel Name'}
                    <span className="font-inter text-sm">
                      ({booking.room?.roomType || 'Room Type'})
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img
                      src={assets.locationIcon}
                      alt="location-icon"
                      className="w-4 h-4"
                    />
                    <span className="whitespace-nowrap">{booking.hotel?.address || 'Address not available'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img
                      src={assets.guestsIcon}
                      alt="guests-icon"
                      className="w-4 h-4"
                    />
                    <span>Guests: {booking.guests}</span>
                  </div>
                  <p className="text-base">Total: ${booking.totalPrice}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex flex-row-reverse md:items-center md:gap-14 mt-3 gap-8">
                <div>
                  <p>Check-In:</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>
                <div>
                  <p>Check-Out:</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex flex-col items-center justify-center pt-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <p className={`${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                    {booking.isPaid ? 'Paid' : 'Unpaid'}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{booking.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings