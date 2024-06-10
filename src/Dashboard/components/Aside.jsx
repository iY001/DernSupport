import React from 'react'
import { Link } from 'react-router-dom'
import { ImExit } from "react-icons/im";

function Aside({ showAside, setShowAside }) {
  const links = [
    { name: 'Home', link: 'home' },
    { name: 'Users', link: 'users' },
    { name: 'Tickets', link: 'tickets' },
    { name: 'Problems', link: 'problems' },
  ];

  return (
    <aside className={`z-50 fixed top-0 left-0 h-full bg-white shadow-md transition-transform transform py-2 duration-200 ${showAside ? 'translate-x-0' : '-translate-x-full left-[-300px]'} md:translate-x-0 md:w-64 w-full duration-300`}>
      <div className="p-4 font-bold text-xl text-gray-800 flex justify-between items-center">
        <h1>
        Dashboard
        </h1>
        <button
          onClick={() => setShowAside(false)}
          className="md:hidden text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          {links.map(link => (
            <li className="mb-2" key={link.name}>
              <Link to={link.link} className="block py-2 px-4 duration-200 text-gray-700 hover:bg-gray-200 rounded" onClick={() => setShowAside(false)}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <section className='flex flex-col h-full justify-end '>
            <Link to='/home' className="flex items-center gap-2 py-2 px-4 text-gray-700 hover:bg-red-400 hover:text-white rounded duration-200">
            <ImExit /> Exit Dashboard
            </Link>
        </section>
      </nav>
    </aside>
  )
}

export default Aside
