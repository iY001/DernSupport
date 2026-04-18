import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom';
import { useAuth } from './../Auth/AuthLayout';
import { IoPersonSharp, IoHomeSharp, IoWarningSharp, IoTicketOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiMenu2Line } from 'react-icons/ri';
import { FiSettings, FiLogOut, FiLayout } from 'react-icons/fi';

function Navbar() {
  const [showAside, setShowAside] = useState(false);
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
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

  useEffect(() => {
    if (showAside) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showAside]);

  const navLinkClass = ({ isActive }) => (
    isActive
      ? 'flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-3 py-2 rounded-xl'
      : 'flex items-center gap-2 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-xl'
  );

  const closeMenu = () => setShowAside(false);


  return (
    <>
      {showAside && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <div className="relative isolate z-[9999] md:w-[95%] w-full mx-auto px-4 py-4 flex justify-between items-center md:static sticky top-0 bg-white backdrop-blur-md border-b border-slate-200">
        <section className='w-1/2 flex flex-start items-center gap-4'>
          <img src="assets/Logo.png" className='h-12' alt="logo" />
          <h1 className='font-semibold flex uppercase md:text-2xl text-xl font-["Cairo"]'>Dern Support</h1>
        </section>

        <section className='w-1/2 lg:flex hidden flex-row justify-end items-center z-[50]'>
          <ul className='flex justify-end items-center gap-6 xl:gap-10'>
            {links.map((link) => (
              <NavLink to={link.link} className={navLinkClass} key={link.name}>
                {link.icon} {link.name}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <section className='flex gap-3'>
                <Link to="/signin" className='w-28 h-10 rounded-xl px-4 flex justify-center items-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white font-semibold duration-300'>Login</Link>
                <Link to="/signup" className='w-28 h-10 rounded-xl px-4 flex justify-center items-center bg-blue-600 text-white hover:bg-blue-700 font-semibold duration-300'>Register</Link>
              </section>
            ) : (
              <section className='flex gap-3'>
                <ProfileDropdown />
              </section>
            )}
          </ul>
        </section>

        <section className='w-1/2 lg:hidden flex flex-row justify-end items-center'>
          <button
            onClick={() => setShowAside(prev => !prev)}
            aria-label="Toggle menu"
            className='text-2xl text-slate-700 hover:text-slate-900 rounded-xl p-2 hover:bg-slate-100 transition'
          >
            <RiMenu2Line />
          </button>

          <MobileDrawer showAside={showAside} closeMenu={closeMenu} links={links} isAuthenticated={isAuthenticated} user={user} logout={logout} />
        </section>
      </div>

    </>
  )
}


function MobileDrawer({ showAside, closeMenu, links, isAuthenticated, user, logout }) {
  return (
    <div className={`h-screen z-50 fixed top-0 right-0 w-[84%] max-w-sm bg-white shadow-2xl border-l border-slate-200 transition-transform duration-300 ${showAside ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="px-5 py-5 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Menu</h2>
        <button onClick={closeMenu} className="rounded-lg px-2 py-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100">Close</button>
      </div>

      <div className="h-[calc(100%-72px)] overflow-y-auto flex flex-col">
        <nav className="p-4 border-b border-slate-100">
          {links.map((link) => (
            <NavLink
              key={link.name}
              onClick={closeMenu}
              to={link.link}
              className={({ isActive }) => (
                isActive
                  ? 'w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white mb-2'
                  : 'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 mb-2'
              )}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {!isAuthenticated ? (
          <section className='w-full px-4 py-4 flex flex-col gap-3 mt-auto'>
            <Link to="/signin" onClick={closeMenu} className='w-full rounded-xl h-11 px-4 flex justify-center items-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white font-semibold duration-300'>Login</Link>
            <Link to="/signup" onClick={closeMenu} className='w-full rounded-xl h-11 px-4 flex justify-center items-center bg-blue-600 text-white hover:bg-blue-700 font-semibold duration-300'>Register</Link>
          </section>
        ) : (
          <section className='p-4 mt-auto'>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>

              <div className="mt-3 space-y-1">
                {user?.role === 'admin' && (
                  <NavLink onClick={closeMenu} to="/dashboard" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-white">
                    <FiLayout /> Dashboard
                  </NavLink>
                )}
                <Link onClick={closeMenu} to="/mytickets" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-white">
                  <IoTicketOutline /> My Tickets
                </Link>
                <Link onClick={closeMenu} to="/settings" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-white">
                  <FiSettings /> Settings
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">
                  <FiLogOut /> Sign out
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}




const ProfileDropdown = () => {
  const { logout } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'));

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    setPosition({
      top: rect.bottom + 8,
      right: Math.max(12, viewportWidth - rect.right),
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleOutsideClick = (event) => {
      const clickedOutsideButton = wrapperRef.current && !wrapperRef.current.contains(event.target);
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      if (clickedOutsideButton && clickedOutsideMenu) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleReposition = () => updatePosition();

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const dropdownLinkClass = 'flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100';

  return (
    <div ref={wrapperRef} className="relative inline-block z-[10000]">
      <button
        id="dropdownInformationButton"
        onClick={toggleDropdown}
        className="peer text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
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
      {isOpen && createPortal(
        <div
          id="dropdownInformation"
          ref={menuRef}
          style={{ top: `${position.top}px`, right: `${position.right}px` }}
          className="fixed z-[20000] bg-white border border-slate-200 divide-y divide-slate-100 rounded-xl shadow-lg w-56"
        >
          <div className="px-4 py-3 text-sm text-slate-900">
            <div className="font-semibold">{user?.name}</div>
            <div className="text-xs text-slate-500 truncate flex flex-wrap">{user?.email}</div>
          </div>
          <ul className="py-2 text-sm" aria-labelledby="dropdownInformationButton">
            {user?.role === "admin" && (
              <li>
                <Link to="/dashboard" className={dropdownLinkClass}>
                  <FiLayout /> Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/mytickets" className={dropdownLinkClass}>
                <IoTicketOutline /> My Tickets
              </Link>
            </li>
            <li>
              <Link to="/settings" className={dropdownLinkClass}>
                <FiSettings /> Settings
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <FiLogOut /> Sign out
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export default Navbar