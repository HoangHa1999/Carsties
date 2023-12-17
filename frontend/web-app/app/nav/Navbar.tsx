import React from 'react'
import { IoCarSportSharp } from "react-icons/io5";

export default function NavBar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md'>
      <div>
        <div className='flex items-center gap-2 text-3xl font-semibold text-red-500'>
          <IoCarSportSharp size={34}/>
          Carsties Auctions
        </div>
      </div>
      <div>middle</div>
      <div>right</div>
    </header>
  )
}
