import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from './../Auth/AuthLayout';
import { IoPersonSharp, IoHomeSharp, IoHelpBuoySharp, IoWarningSharp, IoLogInSharp, IoLogOutSharp } from "react-icons/io5"; // Added additional sharp icons
import { MdOutlineSupportAgent } from "react-icons/md";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const links = [
    {
      name: "Home",
      link: "/",
      icon: <IoHomeSharp />
    },
    {
      name: "About",
      link: "/about",
      icon: <IoPersonSharp />
    },
    {
      name: "Support",
      link: "/support",
      icon: <MdOutlineSupportAgent  />
    },
    {
      name: "Problems",
      link: "/problems",
      icon: <IoWarningSharp />
    }
  ];


  return (
    <>

      {/* Not logged in */}
      {
        !isAuthenticated && (
          <>
            <div className='md:w-[95%] w-full mx-auto px-4 py-4 flex justify-between items-center md:static sticky top-0 bg-white z-[50]'>
              <section className='w-1/2 flex flex-start items-center gap-4 '>
                <img src="assets/Logo.png" className='h-12' alt="logo" />
                <h1 className='font-semibold flex uppercase drop-shadow-2xl stroke-slate-50 stroke-2 md:text-2xl text-xl font-["Cairo"]'>
                  Dern Support
                </h1>
              </section>
              <section className='w-1/2 lg:flex hidden flex-row justify-end items-center z-[50]'>
                <ul className='flex justify-end items-center gap-12'>
                  {
                    links.map((link) => {
                      return (
                        <NavLink to={link.link} className={({ isActive }) => (isActive ? 'flex items-center gap-2 text-primary font-semibold bg-gray-100 px-3 py-2 rounded-lg' : 'flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg')} key={link.name}>
                          {link.icon} {link.name}
                        </NavLink>
                      )
                    })
                  }
                  <section className='flex gap-4'>
                    <Link to="/signin" className='w-28 h-10 rounded-[10px] px-4 flex justify-center items-center bg-white hover:bg-opacity-85 text-primary ring-2 ring-primary hover:bg-primary hover:text-white font-semibold duration-300'>Login</Link>
                    <Link to="/signup" className='w-28 h-10 rounded-[10px] px-4 flex justify-center items-center bg-white hover:bg-opacity-85 text-primary ring-2 ring-primary hover:bg-primary hover:text-white font-semibold duration-300'>Register</Link>
                  </section>
                </ul>
              </section>
              <section className='w-1/2 lg:hidden flex flex-row justify-end items-center '>
                <button onClick={() => setShowAside(!showAside)} className='text-3xl relative flex flex-col justify-center cursor-pointer duration-300 gap-2 pl-4'>
                  {/* {
                showAside ? <RiCloseLine className='text-white'/> : <RiMenu2Line  className='text-white'/>  
              } */}
                  <span className={`top block w-5 h-[2px] duration-300 text-black ${showAside ? "absolute rotate-45" : ""} top-0 left-4 ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                  <span className={`middle block h-[2px] duration-300 w-5 ${showAside ? "-rotate-45" : ""}  top-0 left-4 ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                  <span className={`last h-[2px] w-5 ${showAside ? "absolute -rotate-45" : ""} top-0 duration-300  ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                </button>


                <div className={`h-full z-50 fixed ${showAside ? " md:w-72 w-full" : " w-0"} ${showAside ? "right-0" : "right-[-200px]"} top-[80px] md:bg-white bg-gray-100 duration-300`}>
                  <ul className='h-full flex flex-col md:items-start justify-start items-start gap-4 md:py-0 py-4'>
                    {
                      links.map((link) => {
                        return (
                          <NavLink onClick={() => setShowAside(false)} to={link.link} className={(({ isActive }) => (isActive ? 'w-full px-4 py-2 font-["Ubuntu"] text-xl hover:cursor-pointer bg-primary text-white ' : 'w-full px-4 py-2 font-["Ubuntu"] text-xl hover:cursor-pointer text-gray-700 hover:bg-primary hover:text-white'))} key={link.name}>
                            {link.name}
                          </NavLink>
                        )
                      })
                    }
                    <section className='w-full px-4 flex flex-col justify-between gap-4 '>
                      <Link to="/signin" onClick={() => setShowAside(false)} className='w-full rounded-sm h-10 px-4 flex justify-center items-center bg-white hover:bg-opacity-85 text-primary ring-2 ring-primary hover:bg-primary hover:text-white hover:ring-white font-semibold duration-300'>Login</Link>
                      <Link to="/signup" onClick={() => setShowAside(false)} className='w-full rounded-sm h-10 px-4 flex justify-center items-center bg-white hover:bg-opacity-85 text-primary ring-2 ring-primary hover:bg-primary hover:text-white hover:ring-white font-semibold duration-300'>Register</Link>
                    </section>
                  </ul>
                </div>
              </section>
            </div>
          </>
        )
      }


      {/* Authenticated */}
      {
        isAuthenticated === "true" && (
          <>
            <div className={`w-full md:static sticky top-0 mx-auto px-4 py-4 flex justify-between items-center bg-white z-[50] `}>
              <section className='w-1/2 flex flex-start items-center gap-4 bg-white'>
                <img src="assets/Logo.png" className='h-12' alt="logo" />
                <h1 className='font-semibold text-primary text-nowrap flex flex-col uppercase drop-shadow-2xl stroke-slate-50 stroke-2 text-2xl font-["Cairo"]'>
                  Dern <span className='text-black uppercase drop-shadow-2xl stroke-slate-50 stroke-2 text-2xl font-["Cairo"]'>Support</span>
                </h1>
              </section>
              <section className='w-1/2 lg:flex hidden flex-row justify-end items-center z-[50] bg-white'>
                <ul className='flex justify-end items-center gap-12 bg-white'>
                  {
                    links.map((link) => {
                      return (
                        <NavLink to={link.link} className={({ isActive }) => (isActive ? 'flex items-center gap-2 text-primary font-semibold bg-gray-100 px-3 py-2 rounded-lg' : 'flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg')} key={link.name}>
                          {link.icon}  {link.name}
                        </NavLink>
                      )
                    })
                  }
                  <section className='flex gap-4'>
                    <ProfileDropdown />
                  </section>
                </ul>
              </section>
              <section className='w-1/2 lg:hidden flex flex-row justify-end items-center bg-white'>
                <button onClick={() => setShowAside(!showAside)} className='text-3xl relative flex flex-col justify-center cursor-pointer duration-300 gap-2 pl-4'>
                  {/* {
                showAside ? <RiCloseLine className='text-white'/> : <RiMenu2Line  className='text-white'/>  
              } */}
                  <span className={`top block w-5 h-[2px] duration-300 text-black ${showAside ? "absolute rotate-45" : ""} top-0 left-4 ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                  <span className={`middle block h-[2px] duration-300 w-5 ${showAside ? "-rotate-45" : ""}  top-0 left-4 ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                  <span className={`last h-[2px] w-5 ${showAside ? "absolute -rotate-45" : ""} top-0 duration-300  ${isHovered ? "md:bg-primary bg-black" : "bg-black"}`}></span>
                </button>


                <div className={`h-full z-50 fixed ${showAside ? " md:w-72 w-full" : " w-0"} ${showAside ? "right-0" : "right-[-200px]"} top-[95px] md:bg-white bg-gray-100 duration-300`}>
                  <ul className='h-full flex flex-col md:items-start justify-center items-start gap-4 md:py-0 py-4'>
                    {
                      links.map((link) => {
                        return (
                          <NavLink onClick={() => setShowAside(false)} to={link.link} className={(({ isActive }) => (isActive ? 'w-full px-4 py-2 font-["Ubuntu"] text-xl hover:cursor-pointer bg-primary text-white ' : 'w-full px-4 py-2 font-["Ubuntu"] text-xl hover:cursor-pointer text-gray-700 hover:bg-primary hover:text-white'))} key={link.name}>
                            {link.name}
                          </NavLink>
                        )
                      })
                    }
                    <section className='w-full h-full  px-5 flex flex-col gap-4 justify-end mb-[40%]'>
                      <div
                        className=" z-10 mt-2 bg-white  divide-y divide-gray-100 rounded-lg shadow w-full"
                      >
                        <div className="px-4 py-3 text-sm text-black dark:text-white">
                          <div className='text-black'>{user?.name}</div>
                          <div className="font-medium truncate flex flex-wrap text-black">{user?.email}</div>
                        </div>
                        <hr className='bg-gray-400' />
                        <ul className="py-2 text-sm  dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                          {
                            user?.role === "admin" && (
                              <>
                                <li>
                                  <NavLink onClick={() => setShowAside(false)} to={"/dashboard"} className="block px-4 py-2 text-black hover:bg-primary hover:text-white">Dashboard</NavLink>
                                </li>
                              </>
                            )
                          }
                          <li>
                            <Link onClick={() => setShowAside(false)} to="/mytickets" className="block px-4 py-2 text-black hover:bg-primary hover:text-white">My Tickets</Link>
                          </li>
                          <li>
                            <Link onClick={() => setShowAside(false)} to="/settings" className="block px-4 py-2 text-black hover:bg-primary hover:text-white">Settings</Link>
                          </li>
                        </ul>
                        <hr className='bg-gray-400' />
                        <div className="py-2">
                          <a onClick={logout} className="block cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-red-100">Sign out</a>
                        </div>
                      </div>
                    </section>
                  </ul>
                </div>
              </section>
            </div>

          </>
        )
      }

    </>
  )
}




const ProfileDropdown = () => {
  const { logout } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'));

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        id="dropdownInformationButton"
        onClick={toggleDropdown}
        className="peer text-black bg-white border-2 border-primary hover:bg-primary hover:text-white focus:text-white focus:bg-primary focus:outline-none focus:ring-pr font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
        type="button"
      >
        <IoPersonSharp /> Profile
        <span className={`duration-300 ${isOpen ? '-rotate-180' : ''}`}>
          <svg
            className="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div
          id="dropdownInformation"
          className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user?.name}</div>
            <div className="font-medium truncate flex flex-wrap">{user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
            {
              user?.role === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                </>
              )
            }
            <li>
              <Link to="/mytickets" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Tickets</Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
            </li>
          </ul>
          <div className="py-2">
            <a onClick={logout} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar