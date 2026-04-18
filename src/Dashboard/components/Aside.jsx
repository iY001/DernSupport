import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ImExit } from "react-icons/im";
import { IoPersonSharp, IoHomeSharp, IoHelpBuoySharp, IoTicket } from "react-icons/io5";


function Aside({ showAside, setShowAside }) {
  const links = [
    { name: 'Home', link: 'home' , icon: <IoHomeSharp />  },
    { name: 'Users', link: 'users' , icon: <IoPersonSharp />  },
    { name: 'Tickets', link: 'tickets' , icon: <IoTicket />  },
    { name: 'Problems', link: 'problems' , icon: <IoHelpBuoySharp />  },
  ];

  return (
    <aside className={`z-50 fixed top-0 left-0 h-full w-[88%] max-w-xs bg-white/95 backdrop-blur-md border-r border-slate-200 shadow-xl transition-transform transform py-3 duration-200 ${showAside ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
      <div className="px-5 py-4 font-bold text-xl text-slate-800 flex justify-between items-center border-b border-slate-200">
        <h1>Dashboard</h1>
        <button
          onClick={() => setShowAside(false)}
          className="md:hidden text-slate-500 hover:text-slate-900"
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

      <nav className="mt-4 w-full px-4 h-[calc(100%-90px)] flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-2 mb-2">Navigation</p>
        <ul className="space-y-1">
          {links.map(link => (
            <li className="w-full" key={link.name}>
              <NavLink
                to={link.link}
                className={({ isActive }) => (isActive
                  ? 'flex items-center gap-4 py-2.5 px-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow'
                  : 'flex items-center gap-4 py-2.5 px-4 w-full rounded-xl text-slate-700 hover:bg-slate-100')}
                onClick={() => setShowAside(false)}
              >
                {link.icon} {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <section className='flex flex-col mt-auto pb-2'>
            <Link to='/home' className="flex items-center gap-2 py-2.5 px-4 text-slate-700 hover:bg-red-500 hover:text-white rounded-xl duration-200 border border-slate-200">
            <ImExit /> Exit Dashboard
            </Link>
        </section>
      </nav>
    </aside>
  )
}

export default Aside
