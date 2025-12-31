
import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { roomsAPI, hotelsAPI } from '../../utils/api'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AddRoom = () => {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    hotelId: '',
    roomType: '',
    pricePerNight: '',
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })

  useEffect(() => {
    const fetchHotels = async () => {
      if (!isSignedIn) return

      try {
        const response = await hotelsAPI.getOwnerHotels()
        if (response.success) {
          setHotels(response.hotels)
          if (response.hotels.length > 0) {
            setInputs(prev => ({ ...prev, hotelId: response.hotels[0]._id }))
          }
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }

    fetchHotels()
  }, [isSignedIn])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputs.hotelId || !inputs.roomType || !inputs.pricePerNight) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)

      // Prepare form data for images
      const formData = new FormData()
      formData.append('hotelId', inputs.hotelId)
      formData.append('roomType', inputs.roomType)
      formData.append('pricePerNight', inputs.pricePerNight)

      // Add selected amenities
      const selectedAmenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
      selectedAmenities.forEach(amenity => {
        formData.append('amenities', amenity)
      })

      // Add images
      Object.values(images).forEach((image, index) => {
        if (image) {
          formData.append('images', image)
        }
      })

      // For now, we'll use the API without images since the backend might not handle multipart yet
      const roomData = {
        hotelId: inputs.hotelId,
        roomType: inputs.roomType,
        pricePerNight: parseInt(inputs.pricePerNight),
        amenities: selectedAmenities,
        images: [] // Placeholder for now
      }

      const response = await roomsAPI.create(roomData)

      if (response.success) {
        alert('Room added successfully!')
        navigate('/list-rooms')
      } else {
        alert(response.message || 'Failed to add room')
      }
    } catch (error) {
      console.error('Error adding room:', error)
      alert('Failed to add room. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div className='mt-14'>
        <Title align='center' title='Access Denied' subTitle='Please sign in as a hotel owner to add rooms' />
      </div>
    )
  }

  if (hotels.length === 0) {
    return (
      <div className='mt-14'>
        <Title align='center' title='No Hotels Found' subTitle='You need to create a hotel first before adding rooms' />
        <div className='text-center mt-4'>
          <button
            onClick={() => navigate('/create-hotel')}
            className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
          >
            Create Hotel
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='mt-14'>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and provide accurate room details, pricing, and amenities to enhance the user booking experience."
      />

      {/* Hotel Selection */}
      <div className="mt-4">
        <p className="text-gray-800">Select Hotel</p>
        <select
          value={inputs.hotelId}
          onChange={(e) => setInputs({ ...inputs, hotelId: e.target.value })}
          className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full max-w-xs"
          required
        >
          <option value="">Select Hotel</option>
          {hotels.map(hotel => (
            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
          ))}
        </select>
      </div>

      {/* Upload area for images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-32 cursor-pointer opacity-80"
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      {/* Room type and price */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div className="mt-4 text-gray-800">
          <p>
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity]
                  }
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Room...' : 'Add Room'}
      </button>
    </form>
  )
}

export default AddRoom
