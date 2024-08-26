import React from 'react'
import { RiMenu2Line } from 'react-icons/ri'

function Navbar({ showAside , setShowAside }) {
  const user = JSON.parse(localStorage.getItem('user'))

  const getBackgroundColorClass = (letter) => {
    if (!letter) return 'bg-gray-500';
    const firstLetter = letter.toLowerCase();
    if ('abcdefg'.includes(firstLetter)) return 'bg-red-500';
    if ('hijklm'.includes(firstLetter)) return 'bg-blue-500';
    if ('nopqrst'.includes(firstLetter)) return 'bg-green-500';
    return 'bg-yellow-500';
  };
  return (
    <nav className=" bg-white shadow-md p-4 flex justify-between items-center">
      <button onClick={() => setShowAside(prev => !prev)} className={` text-3xl relative flex flex-col justify-center cursor-pointer duration-300 gap-2 ${showAside ? 'pl-4' : 'md:pl-4'} `}>
        <RiMenu2Line className="text-black" />
      </button>
      <div className="flex flex-row-reverse items-center gap-4">
        {/* <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full mr-4" /> */}
        <div className={`relative rounded-full ${getBackgroundColorClass(user?.name.charAt(0))} w-10 h-10 flex items-center justify-center text-white text-md`}>
              {user?.name.charAt(0).toUpperCase()}
              {/* <span className='absolute bottom-1 right-2 ring-4 ring-gray-200 bg-green-600 h-3 w-3 p-2 rounded-full'>
              </span> */}
            </div>
        <div>
          <div className="text-gray-800 font-bold text-end">{user?.name}</div>
          <div className="text-gray-600 text-sm">{user?.email}</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
