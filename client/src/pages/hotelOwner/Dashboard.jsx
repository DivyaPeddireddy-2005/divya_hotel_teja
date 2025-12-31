import React from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {
  return (
    <div className='mt-14'>
        <Title align='left' font='outfit' title='Dashboard'
         subTitle='Monitor your room listings ,trak bookings and 
         anlyze revenue-all in one place.stay updated with real-time insights
          to ensure smooth operations.'  />

          <div className='flex gap-4 my-8'>
            {/* total bookings */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Total Bookings</p>
                    <p className='text-neutral-400 text-base'>{dashboardDummyData.totalBookings}</p>
                </div>
            </div>
            {/* total revenue */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
              <img className='max-sm:hidden h-10' src={assets.totalRevenueIcon} alt="" />
              <div className='flex flex-col sm:ml-4 font-medium'>
                <p className='text-blue-500 text-lg'>Total Bookings</p>
                <p className='text-neutral-400 text-base'>{dashboardDummyData.totalBookings}</p>
              </div>
            </div>
          </div>


          {/* recent bookings */}
          <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>


          <div className='w-full text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                  <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>

                </tr>

              </thead>



              <tbody className='text-sm'>
                {dashboardDummyData.bookings.map((item,index)=>(
                  <tr key={index}>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                      {item.user.username}
                    </td>

                     <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                      ${item.totalPrice}
                    </td>
                    <td className='py-3 px-4 border-t border-gray-300  flex'>
                      <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-200 text-green-600':'bg-amber-200 text-yellow-600'}`}>
                        {item.isPaid ? 'Completed' :'Pending'}
                      </button>

                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>




    </div>
  )
}

export default Dashboard