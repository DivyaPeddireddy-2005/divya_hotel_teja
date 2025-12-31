import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { bookingsAPI } from '../../utils/api'
import { useUser } from '@clerk/clerk-react'

const Dashboard = () => {
  const { isSignedIn } = useUser()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isSignedIn) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await bookingsAPI.getAllBookings()
        if (response.success) {
          const ownerBookings = response.bookings.filter(booking =>
            booking.hotel?.owner === response.bookings[0]?.hotel?.owner // Assuming all bookings belong to the same owner for simplicity
          )

          setBookings(ownerBookings.slice(0, 10)) // Show last 10 bookings

          // Calculate stats
          const totalBookings = ownerBookings.length
          const totalRevenue = ownerBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)

          setStats({ totalBookings, totalRevenue })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [isSignedIn])

  if (!isSignedIn) {
    return (
      <div className='mt-14'>
        <Title align='center' title='Access Denied' subTitle='Please sign in as a hotel owner to access the dashboard' />
      </div>
    )
  }

  return (
    <div className='mt-14'>
        <Title align='left' font='outfit' title='Dashboard'
         subTitle='Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations.' />

          <div className='flex gap-4 my-8'>
            {/* total bookings */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Total Bookings</p>
                    <p className='text-neutral-400 text-base'>{loading ? '...' : stats.totalBookings}</p>
                </div>
            </div>
            {/* total revenue */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
              <img className='max-sm:hidden h-10' src={assets.totalRevenueIcon} alt="" />
              <div className='flex flex-col sm:ml-4 font-medium'>
                <p className='text-blue-500 text-lg'>Total Revenue</p>
                <p className='text-neutral-400 text-base'>${loading ? '...' : stats.totalRevenue}</p>
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
                {loading ? (
                  <tr>
                    <td colSpan="4" className='py-8 text-center text-gray-500'>Loading bookings...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className='py-8 text-center text-gray-500'>No bookings yet</td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr key={booking._id || index}>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                        {booking.user?.username || 'Unknown User'}
                      </td>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                        {booking.room?.roomType || 'Room'}
                      </td>
                      <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                        ${booking.totalPrice}
                      </td>
                      <td className='py-3 px-4 border-t border-gray-300'>
                        <button className={`py-1 px-3 text-xs rounded-full mx-auto block ${booking.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'}`}>
                          {booking.isPaid ? 'Completed' : 'Pending'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>




    </div>
  )
}

export default Dashboard