import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets, facilityIcons } from '../../assets/assets'
import { roomsAPI, hotelsAPI } from '../../utils/api'
import { useUser } from '@clerk/clerk-react'

const ListRoom = () => {
  const { isSignedIn } = useUser()
  const [rooms, setRooms] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHotel, setSelectedHotel] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        // Fetch owner's hotels
        const hotelsResponse = await hotelsAPI.getOwnerHotels()
        if (hotelsResponse.success) {
          setHotels(hotelsResponse.hotels)
          if (hotelsResponse.hotels.length > 0) {
            setSelectedHotel(hotelsResponse.hotels[0]._id)
          }
        }

        // Fetch all rooms (we'll filter by owner's hotels on frontend)
        const roomsResponse = await roomsAPI.getAll()
        if (roomsResponse.success) {
          setRooms(roomsResponse.rooms)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isSignedIn])

  // Filter rooms by selected hotel
  const filteredRooms = rooms.filter(room => room.hotel?._id === selectedHotel)

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await roomsAPI.delete(roomId)
        if (response.success) {
          setRooms(rooms.filter(room => room._id !== roomId))
          alert('Room deleted successfully')
        } else {
          alert(response.message || 'Failed to delete room')
        }
      } catch (error) {
        console.error('Error deleting room:', error)
        alert('Failed to delete room')
      }
    }
  }

  if (!isSignedIn) {
    return (
      <div className='mt-14'>
        <Title align='center' title='Access Denied' subTitle='Please sign in as a hotel owner to manage rooms' />
      </div>
    )
  }

  return (
    <div className='mt-14'>
      <Title
        align='left'
        font='outfit'
        title='Room Listings'
        subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'
      />

      {/* Hotel Selector */}
      {hotels.length > 1 && (
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Select Hotel</label>
          <select
            value={selectedHotel}
            onChange={(e) => setSelectedHotel(e.target.value)}
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {hotels.map(hotel => (
              <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <div className='text-center py-8'>Loading rooms...</div>
      ) : filteredRooms.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500 mb-4'>No rooms found for this hotel.</p>
          <a href='/add-room' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Your First Room
          </a>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredRooms.map((room) => (
            <div key={room._id} className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
              <img
                src={room.images?.[0] || assets.roomImg1}
                alt={room.roomType}
                className='w-full h-48 object-cover'
              />

              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-2'>{room.roomType}</h3>
                <p className='text-gray-600 mb-2'>${room.pricePerNight}/night</p>

                <div className='flex flex-wrap gap-1 mb-4'>
                  {room.amenities?.slice(0, 3).map((amenity, index) => (
                    <span key={index} className='text-xs bg-gray-100 px-2 py-1 rounded'>
                      {amenity}
                    </span>
                  ))}
                  {room.amenities?.length > 3 && (
                    <span className='text-xs bg-gray-100 px-2 py-1 rounded'>
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className='flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'
                  >
                    Delete
                  </button>
                  <button className='flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListRoom
