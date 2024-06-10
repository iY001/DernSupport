import React from 'react'
import { RiMenu2Line } from 'react-icons/ri'

function Navbar({ showAside , setShowAside }) {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <nav className=" bg-white shadow-md p-4 flex justify-between items-center">
      <button onClick={() => setShowAside(prev => !prev)} className={` text-3xl relative flex flex-col justify-center cursor-pointer duration-300 gap-2 ${showAside ? 'pl-4' : 'md:pl-4'} `}>
        <RiMenu2Line className="text-black" />
      </button>
      <div className="flex items-center">
        <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
        <div>
          <div className="text-gray-800 font-bold">{user.name}</div>
          <div className="text-gray-600 text-sm">{user.email}</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
