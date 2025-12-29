// // import React, { useState } from 'react'
// // import { roomsDummyData } from '../../assets/assets'

// // const ListRoom = () => {

// //   const [rooms,setRooms]=useState(roomsDummyData)

// //   return (
// //     <div>
// //       <Title align='left' font='outfit' title='Room Listings' subTitle='View,edit,or manage all listed rooms.keep the informtion up-to-date to provide the best experience for users.'/>
// //     </div>
// //   )
// // }

// // export default ListRoom




// // import React, { useState } from 'react'
// // import Title from '../../components/Title'
// // import { assets } from '../../assets/assets'

// // const AddRoom = () => {
// //   const [images, setImages] = useState({
// //     1: null,
// //     2: null,
// //     3: null,
// //     4: null
// //   })

// //   const [inputs, setInputs] = useState({
// //     roomType: '',
// //     pricePerNight: 0,
// //     amenities: {
// //       'Free WiFi': false,
// //       'Free Breakfast': false,
// //       'Room Service': false,
// //       'Mountain View': false,
// //       'Pool Access': false
// //     }
// //   })

// //   return (
// //     <form>
// //       <Title
// //         align="left"
// //         font="outfit"
// //         title="Room Listings"
// //         subTitle='View,edit,or manage all listed rooms.keep the informtion up-to-date to provide the best experience for users.' />

// //       {/* Upload area for images */}
// //       <p className="text-gray-800 mt-10">All Rooms</p>

// //       <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
// //         <table className='w-full'>
// //           <thead className='bg-gray-50'>
// //             <tr>
// //               <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
// //               <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
// //               <th className='py-3 px-4 text-gray-800 font-medium'>Price/nigth</th>
// //               <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>

// //             </tr>
// //           </thead>
// //           <tbody className='text-sm'>
// //             {rooms.map((item, index) => (
// //               <tr key={index}>
// //                 <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
// //                   {item.roomType}
// //                 </td>
// //                 <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
// //                   {item.amenities.join(',')}
// //                 </td>
// //                 <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
// //                   {item.pricePerNight}
// //                 </td>
// //                  <td className='py-3 text-center px-4 text-red-500 border-t border-gray-300'>
// //                 <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
// //                   <input type="checkbox" className='sr-only peer' checked={item.isAvailable} />
// //                   <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
// //                   <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
// //                 </label>
// //                 </td>
                

// //               </tr>
// //             ))}

// //           </tbody>


// //         </table>





// // {/* 
































// {/* 


//         {Object.keys(images).map((key) => (
//           <label htmlFor={`roomImage${key}`} key={key}>
//             <img
//               className="max-h-32 cursor-pointer opacity-80"
//               src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
//               alt=""
//             />
//             <input
//               type="file"
//               accept="image/*"
//               id={`roomImage${key}`}
//               hidden
//               onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
//             />
//           </label>
//         ))}
//       </div>

//       {/* Room type and price */}
//       {/* <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
//         <div className="flex-1 max-w-48">
//           <p className="text-gray-800 mt-4">Room Type</p>
//           <select
//             value={inputs.roomType}
//             onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
//             className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
//           >
//             <option value="">Select Room Type</option>
//             <option value="Single Bed">Single Bed</option>
//             <option value="Double Bed">Double Bed</option>
//             <option value="Luxury Room">Luxury Room</option>
//             <option value="Family Suite">Family Suite</option>
//           </select>
//         </div>

//         <div className="mt-4 text-gray-800">
//           <p>
//             Price <span className="text-xs">/night</span>
//           </p>
//           <input
//             type="number"
//             placeholder="0"
//             className="border border-gray-300 mt-1 rounded p-2 w-24"
//             value={inputs.pricePerNight}
//             onChange={(e) =>
//               setInputs({ ...inputs, pricePerNight: e.target.value })
//             }
//           />
//         </div>
//       </div>

//       {/* Amenities */}
//       <p className="text-gray-800 mt-4">Amenities</p>
//       <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
//         {Object.keys(inputs.amenities).map((amenity, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               id={`amenities${index + 1}`}
//               checked={inputs.amenities[amenity]}
//               onChange={() =>
//                 setInputs({
//                   ...inputs,
//                   amenities: {
//                     ...inputs.amenities,
//                     [amenity]: !inputs.amenities[amenity]
//                   }
//                 }) */}
//               }
//             />
//             <label htmlFor={`amenities${index + 1}`} className="ml-2">
//               {amenity}
//             </label>
//           </div>
//         ))}
//       </div>

//       {/* Submit button */}
//       <button className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer">
//         Add Room
//       </button>
//     </form>
//   )
// } */}

// export default AddRoom */}















import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, roomsDummyData } from '../../assets/assets'   // ✅ FIX 1: import roomsDummyData

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })

  const [rooms, setRooms] = useState(roomsDummyData)   // ✅ FIX 2: define rooms state

  return (
    <form className='mt-14'>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users." />

      {/* Upload area for images */}
      <p className="text-gray-800 mt-10">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Facility</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Price/night</th> {/* ✅ FIX 3: typo corrected */}
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(', ')}   {/* ✅ FIX 4: added space after comma */}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.pricePerNight}
                </td>
                <td className="py-3 text-center px-4 text-red-500 border-t border-gray-300">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input type="checkbox" className="sr-only peer" checked={item.isAvailable} readOnly /> {/* ✅ FIX 5: added readOnly to avoid React warning */}
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  )
}

export default AddRoom
