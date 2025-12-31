import React, { useState } from 'react'
import Title from '../../components/Title'
import { hotelsAPI } from '../../utils/api'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const CreateHotel = () => {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    contact: '',
    city: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputs.name || !inputs.address || !inputs.contact || !inputs.city) {
      alert('Please fill in all fields')
      return
    }

    try {
      setLoading(true)

      const response = await hotelsAPI.create(inputs)

      if (response.success) {
        alert('Hotel created successfully!')
        navigate('/owner/add-room')
      } else {
        alert(response.message || 'Failed to create hotel')
      }
    } catch (error) {
      console.error('Error creating hotel:', error)
      alert('Failed to create hotel. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div className='mt-14'>
        <Title align='center' title='Access Denied' subTitle='Please sign in as a hotel owner to create hotels' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='mt-14 max-w-md mx-auto'>
      <Title
        align="center"
        font="outfit"
        title="Create Hotel"
        subTitle="Register your hotel to start adding rooms and managing bookings."
      />

      <div className="space-y-4 mt-8">
        {/* Hotel Name */}
        <div>
          <label className="block text-gray-800 mb-2">Hotel Name</label>
          <input
            type="text"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            className="border border-gray-300 rounded p-3 w-full"
            placeholder="Enter hotel name"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-800 mb-2">Address</label>
          <textarea
            value={inputs.address}
            onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
            className="border border-gray-300 rounded p-3 w-full h-24 resize-none"
            placeholder="Enter full address"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-800 mb-2">Contact Number</label>
          <input
            type="tel"
            value={inputs.contact}
            onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
            className="border border-gray-300 rounded p-3 w-full"
            placeholder="Enter contact number"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-800 mb-2">City</label>
          <input
            type="text"
            value={inputs.city}
            onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
            className="border border-gray-300 rounded p-3 w-full"
            placeholder="Enter city"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-8 py-3 rounded w-full mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Hotel...' : 'Create Hotel'}
        </button>
      </div>
    </form>
  )
}

export default CreateHotel