

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { cities } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!searchData.destination || !searchData.checkIn || !searchData.checkOut) {
      alert('Please fill in all required fields');
      return;
    }

    // Navigate to AllRooms with search parameters
    const searchParams = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests
    });

    navigate(`/rooms?${searchParams.toString()}`);
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>
        The Ultimate Hotel Experience
      </p>
      <h1 className='font-playfair text-2xl md:text-[56px] md:leading-[56px] font-extrabold max-w-4xl mt-4'>
        Discover Your Perfect Getaway Destination
      </h1>
      <p className='max-w-2xl mt-2 text-sm md:text-base'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
      </p>


       <form onSubmit={handleSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                   <img src={assets.calenderIcon} alt="" className='h-4' />
                    <label htmlFor="destination">Destination</label>
                </div>
                <input
                  list='destinations'
                  id="destination"
                  type="text"
                  value={searchData.destination}
                  onChange={handleInputChange}
                  className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                  placeholder="Type here"
                  required
                />
                <datalist id="destinations">
                    {cities.map((city,index)=>(<option value={city} key={index}/>))}

                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4' />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input
                  id="checkIn"
                  type="date"
                  value={searchData.checkIn}
                  onChange={handleInputChange}
                  className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                  required
                />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4' />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input
                  id="checkOut"
                  type="date"
                  value={searchData.checkOut}
                  onChange={handleInputChange}
                  className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                  required
                />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input
                  min={1}
                  max={4}
                  id="guests"
                  type="number"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
                  placeholder="1"
                  required
                />
            </div>

            <button type="submit" className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                 <img src={assets.searchIcon} alt="SearchIcon" className='h-7' />

                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero





































// import React from 'react'

// const Hero = () => {
//   return (
//     <div className='flex flex-col items-start justify-centerpx-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
//         <p className=bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate hotel Experience</p>
//         <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
//         <p className='max-w-130 mt-2 text-sm md:text-base'>Unparalled luxury and comfort await at the world's most excluive hotels and resorts.Start your journey today.</p>

//     </div>
//   )
// }

// export default Hero





