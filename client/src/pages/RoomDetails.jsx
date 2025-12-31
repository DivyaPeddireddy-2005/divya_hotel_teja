import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, facilityIcons } from '../assets/assets'
import StarRating from '../components/StarRating'
import { roomsAPI, bookingsAPI } from '../utils/api'
import { useUser } from '@clerk/clerk-react'

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomsAPI.getById(id)
        if (response.success) {
          setRoom(response.room)
          setMainImage(response.room.images[0])
        }
      } catch (error) {
        console.error('Error fetching room:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRoom()
    }
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()

    if (!isSignedIn) {
      alert('Please sign in to make a booking')
      return
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }

    try {
      setBookingLoading(true)
      const response = await bookingsAPI.create({
        roomId: id,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        guests: bookingData.guests,
        paymentMethod: 'Pay At Hotel' // Default payment method
      })

      if (response.success) {
        alert('Booking created successfully!')
        navigate('/bookings')
      } else {
        alert(response.message || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">Loading room details...</div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">Room not found</div>
      </div>
    )
  }

  return (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* room details */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name || 'Hotel Name'}{' '}
          <span className="font-inter text-sm">{room.roomType}</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* room ratings */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* room address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
        <span>{room.hotel?.address || 'Address not available'}</span>
      </div>

      {/* room images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            className="w-full rounded-xl shadow-lg object-cover"
            src={mainImage}
            alt="room image"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room?.images.length > 1 && room.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() => setMainImage(image)}
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image ? 'ring-2 ring-orange-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* room highlight */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-playfair">
            Experience Luxury Like Never Before
          </h1>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                <img src={facilityIcons[item]} alt={item} className="w-6 h-6" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        {/* room price */}
        <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
      </div>

      {/* checkin checkout form */}
      <form onSubmit={handleBooking} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 w-full">
        <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">Check-In</label>
            <input
              type="date"
              id="checkInDate"
              value={bookingData.checkIn}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-16 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
            <input
              type="date"
              id="checkOutDate"
              value={bookingData.checkOut}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-16 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">Guests</label>
            <input
              type="number"
              id="guests"
              min="1"
              max="4"
              value={bookingData.guests}
              onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={bookingLoading}
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bookingLoading ? 'Creating Booking...' : 'Book Now'}
        </button>
      </form>

      {/* common specifications */}
      <div className="mt-24 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6 h-6" />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* description */}
      <div className="w-full border-y border-gray-300 my-16 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to availability. You will enjoy a comfortable two‑bedroom apartment that offers a true city feeling. The price quoted is for two guests; please mark the number of guests in the booking slot to get the exact price for groups. Guests will be allocated to the ground floor based on availability, and you will have a cozy two‑bedroom apartment with an authentic city atmosphere.
        </p>
      </div>

      {/* hosted by */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <img
            src={room.hotel.owner.image}
            alt="Host"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full"
          />
          <div>
            <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </div>
    </div>
  )
}

export default RoomDetails











// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
// import StarRating from '../components/StarRating'

// const RoomDetails = () => {
//     const { id } = useParams()
//     const [room, setRoom] = useState(null)
//     const [mainImage, setMainImage] = useState(null)

//     useEffect(() => {
//         const room = roomsDummyData.find(room => room._id === id)
//         room && setRoom(room)
//         room && setMainImage(room.images[0])
//     }, [id])

//     return room && (
//         <div className='py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32'>
//             {/* room details */}
//             <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
//                 <h1 className='text-3xl md:text-4xl font-playfair'>
//                     {room.hotel.name} <span className='font-inter text-sm'>{room.roomType}</span>
//                 </h1>
//                 <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
//             </div>

//             {/* room ratings */}
//             <div className='flex items-center gap-1 mt-2'>
//                 <StarRating />
//                 <p className='ml-2'>200+ reviews</p>
//             </div>

//             {/* room address */}
//             <div className='flex items-center gap-1 text-gray-500 mt-2'>
//                 <img src={assets.locationIcon} alt="location-icon" />
//                 <span>{room.hotel.address}</span>
//             </div>

//             {/* room images */}
//             <div className='flex flex-col lg:flex-row mt-6 gap-6'>
//                 <div className='lg:w-1/2 w-full'>
//                     <img className='w-full rounded-xl shadow-lg object-cover' src={mainImage} alt="room image" />
//                 </div>
//                 <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
//                     {room?.images.length > 1 && room.images.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image}
//                             alt=""
//                             onClick={() => setMainImage(image)}
//                             className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline outline-2 outline-orange-500' : ''}`}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* room highlight */}
//             <div className='flex flex-col md:flex-row md:justify-between mt-10'>
//                 <div className='flex flex-col'>
//                     <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
//                     <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                         {room.amenities.map((item, index) => (
//                             <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
//                                 <img src={facilityIcons[item]} alt={item} className='w-6 h-6' />
//                                 <p className='text-xs'>{item}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* room price */}
//                 <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
//             </div>

//             {/* checkin checkout form */}
//             <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
//                 <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
//                     <div className='flex flex-col'>
//                         <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
//                         <input type="date" id='checkInDate'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                     <div className='w-px h-16 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
//                         <input type="date" id='checkOutDate'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                     <div className='w-px h-16 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="guests" className='font-medium'>Guests</label>
//                         <input type="number" id='guests'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                 </div>
//                 <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer'>
//                     Check Availability
//                 </button>
//             </form>

//             {/* common specifications */}
//             <div className='mt-24 space-y-4'>
//                 {roomCommonData.map((spec, index) => (
//                     <div key={index} className='flex items-start gap-2'>
//                         <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6 h-6' />
//                         <div>
//                             <p className='text-base'>{spec.title}</p>
//                             <p className='text-gray-500'>{spec.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* description */}
//             <div className='max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500'>
//                 <p>
//                     Guests will be allocated on the ground floor according to availability. You will enjoy a comfortable two‑bedroom apartment that offers a true city feeling. The price quoted is for two guests; please mark the number of guests in the booking slot to get the exact price for groups. Guests will be allocated to the ground floor based on availability, and you will have a cozy two‑bedroom apartment with an authentic city atmosphere.
//                 </p>
//             </div>

//             {/* hosted by */}
//             <div className='flex flex-col items-start gap-4'>
//                 <div className='flex gap-4'>
//                     <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
//                     <div >
//                         <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
//                         <div className='flex items-center mt-1'>
//                             <StarRating />
//                             <p className='ml-2'>200+ reviews</p>
//                         </div>
//                     </div>
//                 </div>
//                 <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
//                     Contact Now</button>
//             </div>
//         </div>
//     )
// }

// export default RoomDetails

































































// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
// import StarRating from '../components/StarRating'

// const RoomDetails = () => {
//     const { id } = useParams()
//     const [room, setRoom] = useState(null)
//     const [mainImage, setMainImage] = useState(null)

//     useEffect(() => {
//         const room = roomsDummyData.find(room => room._id === id)
//         room && setRoom(room)
//         room && setMainImage(room.images[0])
//     }, [])


//     return room && (
//         <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//             {/* room details */}
//             <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
//                 <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>{room.roomType}</span></h1>
//                 <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
//             </div>

//             {/* room ratings */}
//             <div className='flex items-center gap-1 mt-2'>
//                 <StarRating />
//                 <p className='ml-2'>200+ reviews</p>
//             </div>
//             {/* room address */}
//             <div className='flex items-center gap-1 text-gray-500 mt-2'>
//                 <img src={assets.locationIcon} alt="location-icon" />
//                 <span>{room.hotel.address}</span>
//             </div>


//             {/* room images */}
//             <div className='flex flex-col lg:flex-row mt-6 gap-6'>
//                 <div className='lg:w-1/2 w-full'>
//                     <img className='w-full rounded-xl shadow-lg object-cover' src={mainImage} alt="room image" />
//                 </div>
//                 <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
//                     {room?.images.length > 1 && room.images.map((image, index) => (
//                         <img className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} onClick={() => setMainImage(image)} key={index} src={image} alt="" />
//                     ))}
//                 </div>
//             </div>
//             {/* room highlight */}
//             <div className='flex flex-col md:flex-row md:justify-between mt-10'>
//                 <div className='flex flex-col'>
//                     <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
//                     <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                         {room.amenities.map((item, index) => (
//                             <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
//                                 <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
//                                 <p className='text-xs'>{item}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* room price */}
//                 <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
//             </div>
//             {/* checkin checkout form */}
//             <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
//                 <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>

//                     <div className='flex flex-col'>
//                         <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
//                         <input type="date" id='checkInDate' placeholder='Check-In'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                     <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
//                         <input type="date" id='checkOutDate' placeholder='Check-Out'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>

//                     <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="guests" className='font-medium'>Guests</label>
//                         <input type="number" id='guests' placeholder='Guests'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>

//                 </div>
//                 <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
//                     Check Availability
//                 </button>

//             </form>

//             {/* common specifications */}
//             <div className='mt-25 space-y-4'>
//                 {roomCommonData.map((spec, index) => (
//                     <div key={index} className='flex items-start gap-2'>
//                         <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
//                         <div>
//                             <p className='text-base'>{spec.title}</p>
//                             <p className='text-gray-500'>{spec.description}</p>

//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
//                 <p>Guests will be allocated on the ground floor according to availability. You will enjoy a comfortable two‑bedroom apartment that offers a true city feeling. The price quoted is for two guests; at the guest slot, please mark the number of guests to get the exact price for groups. Guests will be allocated to the ground floor based on availability, and you will have a cozy two‑bedroom apartment with an authentic city atmosphere.</p>
//             </div>
//             {/* hosted by */}
//             <div className='felx felx-col items-start gap-4'>
//                 <div className='flex gap-4'>
//                     <img src={room.hotel.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
//                     <div>
//                         <p>Hosted by {room.hotel.name}</p>
//                         <div className='flex items0center mt-1'>
//                             <StarRating />
//                             <p className='ml-2'>200+ reviews</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RoomDetails






// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
// import StarRating from '../components/StarRating'

// const RoomDetails = () => {
//     const { id } = useParams()
//     const [room, setRoom] = useState(null)
//     const [mainImage, setMainImage] = useState(null)

//     useEffect(() => {
//         const room = roomsDummyData.find(room => room._id === id)
//         room && setRoom(room)
//         room && setMainImage(room.images[0])
//     }, [id])

//     return room && (
//         <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//             {/* room details */}
//             <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
//                 <h1 className='text-3xl md:text-4xl font-playfair'>
//                     {room.hotel.name} <span className='font-inter text-sm'>{room.roomType}</span>
//                 </h1>
//                 <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
//             </div>

//             {/* room ratings */}
//             <div className='flex items-center gap-1 mt-2'>
//                 <StarRating />
//                 <p className='ml-2'>200+ reviews</p>
//             </div>

//             {/* room address */}
//             <div className='flex items-center gap-1 text-gray-500 mt-2'>
//                 <img src={assets.locationIcon} alt="location-icon" />
//                 <span>{room.hotel.address}</span>
//             </div>

//             {/* room images */}
//             <div className='flex flex-col lg:flex-row mt-6 gap-6'>
//                 <div className='lg:w-1/2 w-full'>
//                     <img className='w-full rounded-xl shadow-lg object-cover' src={mainImage} alt="room image" />
//                 </div>
//                 <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
//                     {room?.images.length > 1 && room.images.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image}
//                             alt=""
//                             onClick={() => setMainImage(image)}
//                             className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline outline-2 outline-orange-500' : ''}`}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* room highlight */}
//             <div className='flex flex-col md:flex-row md:justify-between mt-10'>
//                 <div className='flex flex-col'>
//                     <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
//                     <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                         {room.amenities.map((item, index) => (
//                             <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
//                                 <img src={facilityIcons[item]} alt={item} className='w-6 h-6' />
//                                 <p className='text-xs'>{item}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* room price */}
//                 <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
//             </div>

//             {/* checkin checkout form */}
//             <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
//                 <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
//                     <div className='flex flex-col'>
//                         <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
//                         <input type="date" id='checkInDate'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                     <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
//                         <input type="date" id='checkOutDate'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                     <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

//                     <div className='flex flex-col'>
//                         <label htmlFor="guests" className='font-medium'>Guests</label>
//                         <input type="number" id='guests'
//                             className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                     </div>
//                 </div>
//                 <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
//                     Check Availability
//                 </button>
//             </form>

//             {/* common specifications */}
//             <div className='mt-25 space-y-4'>
//                 {roomCommonData.map((spec, index) => (
//                     <div key={index} className='flex items-start gap-2'>
//                         <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6 h-6' />
//                         <div>
//                             <p className='text-base'>{spec.title}</p>
//                             <p className='text-gray-500'>{spec.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* description */}
//             <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
//                 <p>
//                     Guests will be allocated on the ground floor according to availability. You will enjoy a comfortable two‑bedroom apartment that offers a true city feeling. The price quoted is for two guests; please mark the number of guests in the booking slot to get the exact price for groups. Guests will be allocated to the ground floor based on availability, and you will have a cozy two‑bedroom apartment with an authentic city atmosphere.
//                 </p>
//             </div>

//             {/* hosted by */}
//             <div className='flex flex-col items-start gap-4'>
//                 <div className='flex gap-4'>
//                     <img src={room.hotel.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
//                     <div>
//                         <p>Hosted by {room.hotel.name}</p>
//                         <div className='flex items-center mt-1'>
//                             <StarRating />
//                             <p className='ml-2'>200+ reviews</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RoomDetails

