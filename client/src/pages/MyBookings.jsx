// import React, { useState } from 'react'
// import Title from '../components/Title'
// import { assets, userBookingsDummyData } from '../assets/assets'

// const MyBookings = () => {
//   const [bookings, setBookings] = useState(userBookingsDummyData)

//   return (
//     <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 ">
//       <Title
//         title="My Bookings"
//         subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
//         align="left"
//       />

//       <div className="max-w-6xl mt-8 w-full text-gray-800">
//         <div className="hidden md:grid md:grid-cols-3 w-full border-b border-gray-300 font-medium text-base py-3">
//           <div>Hotels</div>
//           <div>Date & Time</div>
//           <div>Payment</div>
//         </div>

//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-gray-300 py-6 first:border-t"
//           >
//             {/* Hotel Info */}
//             <div className="flex flex-col md:flex-row">
//               <img
//                 src={booking.room.images[0]}
//                 alt="hotel-img"
//                 className="md:w-44 rounded shadow object-cover"
//               />
//               <div className="flex flex-col gap-1.5 mt-3 md:ml-4">
//                 <p className="font-playfair text-2xl whitespace-nowrap">
//                   {booking.hotel.name}
//                   <span className="font-inter text-sm">
//                     ({booking.room.roomType})
//                   </span>
//                 </p>
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.locationIcon}
//                     alt="location-icon"
//                     className="w-4 h-4"
//                   />
//                   <span className="whitespace-nowrap">{booking.hotel.address}</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.guestsIcon}
//                     alt="guests-icon"
//                     className="w-4 h-4"
//                   />
//                   <span>Guests: {booking.guests}</span>
//                 </div>
//                 <p className="text-base">Total: ${booking.totalPrice}</p>
//               </div>
//             </div>

//             {/* Date & Time */}
//             <div className="flex flex-row-reverse md:items-center md:gap-14 mt-3 gap-8 ">
//               <div>
//                 <p>Check-In:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkInDate).toDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p>Check-Out:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkOutDate).toDateString()}
//                 </p>
//               </div>
//             </div>

//             {/* Payment Status */}
//             <div className="flex flex-col items-center justify-center pt-3 ">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`h-3 w-3 rounded-full ${
//                     booking.isPaid ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 ></div>
//                 <p className={`${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>
//                   {booking.isPaid ? 'Paid' : 'Unpaid'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyBookings




import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, userBookingsDummyData } from '../assets/assets'

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData)

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-3 w-full border-b border-gray-300 font-medium text-base py-3">
          <div className='pl-18'>Hotels</div>
          <div className='pl-40 '>Date & Time</div>
          <div className='pl-30'>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Hotel Info */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className="md:w-44 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 mt-3 md:ml-4">
                <p className="font-playfair text-2xl whitespace-nowrap">
                  {booking.hotel.name}
                  <span className="font-inter text-sm pl-1">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className="w-4 h-4"
                  />
                  <span className="whitespace-nowrap">{booking.hotel.address}</span>
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
            <div className="flex flex-row-reverse md:items-center md:gap-14 mt-3 gap-8 ">
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
            <div className="flex flex-col items-center justify-center ">
              <div className="flex items-center gap-2 pr-20">
                {/* Circle */}
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                {/* Text */}
                <p className={`${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                  {booking.isPaid ? 'Paid' : 'Unpaid'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings





// import React, { useState } from 'react'
// import Title from '../components/Title'
// import { assets, userBookingsDummyData } from '../assets/assets'

// const MyBookings = () => {
//   const [bookings, setBookings] = useState(userBookingsDummyData)

//   return (
//     <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 ">
//       <Title
//         title="My Bookings"
//         subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
//         align="left"
//       />

//       <div className="max-w-6xl mt-8 w-full text-gray-800">
//         <div className="hidden md:grid md:grid-cols-3 w-full border-b border-gray-300 font-medium text-base py-3">
//           <div>Hotels</div>
//           <div>Date & Time</div>
//           <div>Payment</div>
//         </div>

//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-gray-300 py-6 first:border-t"
//           >
//             {/* Hotel Info */}
//             <div className="flex flex-col md:flex-row">
//               <img
//                 src={booking.room.images[0]}
//                 alt="hotel-img"
//                 className="md:w-44 rounded shadow object-cover"
//               />
//               <div className="flex flex-col gap-1.5 mt-3 md:ml-4">
//                 <p className="font-playfair text-2xl whitespace-nowrap">
//                   {booking.hotel.name}
//                   <span className="font-inter text-sm">
//                     ({booking.room.roomType})
//                   </span>
//                 </p>
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.locationIcon}
//                     alt="location-icon"
//                     className="w-4 h-4"
//                   />
//                   <span className="whitespace-nowrap">{booking.hotel.address}</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.guestsIcon}
//                     alt="guests-icon"
//                     className="w-4 h-4"
//                   />
//                   <span>Guests: {booking.guests}</span>
//                 </div>
//                 <p className="text-base">Total: ${booking.totalPrice}</p>
//               </div>
//             </div>

//             {/* Date & Time */}
//             <div className="flex flex-row-reverse md:items-center md:gap-14 mt-3 gap-8 ">
//               <div>
//                 <p>Check-In:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkInDate).toDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p>Check-Out:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkOutDate).toDateString()}
//                 </p>
//               </div>
//             </div>

//             {/* Payment Status */}
//             <div className='flex flex-col items-start justify-center pt-3 '>
//                 <div className='flex items-center gap-2'>
//                     <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
//                     <p className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}>
//                         {booking.isPaid ? "Paid" : "Unpaid"}
//                     </p>

//                 </div>
//             </div>
         
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyBookings






































// import React, { useState } from 'react'
// import Title from '../components/Title'
// import { assets, userBookingsDummyData } from '../assets/assets'

// const MyBookings = () => {
//   const [bookings, setBookings] = useState(userBookingsDummyData)

//   return (
//     <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
//       <Title
//         title="My Bookings"
//         subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
//         align="left"
//       />

//       <div className="max-w-6xl mt-8 w-full text-gray-800">
//         {/* table header */}
//         <div className="hidden md:grid md:grid-cols-3 w-full border-b border-gray-300 font-medium text-base py-3">
//           <div>Hotels</div>
//           <div>Date & Time</div>
//           <div>Payment</div>
//         </div>

//         {/* bookings list */}
//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-gray-300 py-6 first:border-t"
//           >
//             {/* hotel details */}
//             <div className="flex flex-col md:flex-row">
//               <img
//                 src={booking.room.images[0]}
//                 alt="hotel-img"
//                 className="md:w-44 rounded shadow object-cover"
//               />

//               <div className="flex flex-col gap-1.5 mt-3 md:ml-4">
//                 <p className="font-playfair text-2xl whitespace-nowrap">
//                   {booking.hotel.name}
//                   <span className="font-inter text-sm">
//                     ({booking.room.roomType})
//                   </span>
//                 </p>

//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.locationIcon}
//                     alt="location-icon"
//                     className="w-4 h-4"
//                   />
//                   <span className='whitespace-nowrap'>{booking.hotel.address}</span>
//                 </div>

//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img
//                     src={assets.guestsIcon}
//                     alt="guests-icon"
//                     className="w-4 h-4"
//                   />
//                   <span>Guests: {booking.guests}</span>
//                 </div>

//                 <p className="text-base">Total: ${booking.totalPrice}</p>
//               </div>
//             </div>

//             {/* date & timings */}
//             <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
//              <div>
//                 <p>Check-In:</p>
//                 <p className='className="text-gray-500 text-sm"'>
//                     {new Date(booking.checkInDate).toDateString()}
//                 </p>
//              </div>
//              <div>
//                 <p>Check-Out:</p>
//                 <p className='className="text-gray-500 text-sm"'>
//                     {new Date(booking.checkInDate).toDateString()}
//                 </p>
//             </div>
//             </div>

//             {/* payment status */}
//             {/* <div className="flex items-center md:justify-center mt-4 md:mt-0"> */}
//               {/* <span
//                 className={`px-3 py-1 rounded text-sm font-medium ${
//                   booking.paymentStatus === 'Paid'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'
//                 }`}
//               > */}
//                 {/* {booking.paymentStatus} */}
//               {/* </span> */}
//             </div>
          
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyBookings




















































// import React, { useState } from 'react'
// import Title from '../components/Title'
// import { assets, userBookingsDummyData } from '../assets/assets'
// const MyBookings = () => {

//     const [bookings,setBookings]=useState(userBookingsDummyData)

//     return (
//         <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

//             <Title title="My Bookings" subTitle="Easily manage your past,current,and
//                  upcoming hotel reservations in one place.plan your trips seamlessly with
//                     just a few clicks" align="left" />

//             <div className='max-w-6xl mt-8 w-full text-gray-800'>
//                 <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr]   w-full
//                     border-b border-gray-300 font-medium text-base py-3'>
//                     <div className='w-1/3'>Hotels</div>
//                     <div className='w-1/3'>Date & Time</div>
//                     <div className='w-1/3'>Payment</div>
//                 </div>
                

//                 {bookings.map((booking)=>(
//                     <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
//                         {/* hotel details */}
//                         <div className='flex felx-col md:flex-row'>
//                             <img src={booking.room.images[0]} alt="hotel-img" className='min-md:w-44 rounded shadow object-cover' />
                     
//                         <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
//                             <p className='font-playfair text-2xl'>{booking.hotel.name}
//                                 <span className='font-inter text-sm'>({booking.room.roomType})</span>
//                             </p>
//                             <div className='flex items-center gap-1 text-sm text-gray-500 '>
//                                 <img src={assets.locationIcon} alt="location-icon" className='min-md:w-44 rounded shadow object-cover' />
//                                 <span>{booking.hotel.address}</span>
//                             </div>

//                             <div className='flex items-center gap-1 text-sm text-gray-500 '>
//                                 <img src={assets.guestsIcon} alt="guests-icon" className='min-md:w-44 rounded shadow object-cover' />
//                                 <span>Guests:{booking.guests}</span>
//                             </div>
//                             <p className='text-base'>Total: ${booking.totalPrice}</p>
                            
//                         </div>
//                            </div>
//                             {/* date & timeings */}
//                             <div></div>

//                         {/* payment status */}
//                         <div></div>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MyBookings