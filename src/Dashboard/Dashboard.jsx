import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Users from './components/Users'
import Tickets from './components/Tickets'
import Aside from './components/Aside'
import SingleTicket from './../Pages/MyTickets/SingleTicket';
import Problems from './components/Problems';

function Dashboard() {
  const [showAside, setShowAside] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (showAside && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showAside]);

  return (
    <div className="flex min-h-screen bg-transparent">
      {showAside && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setShowAside(false)}
          className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[1px] md:hidden"
        />
      )}
      <Aside showAside={showAside} setShowAside={setShowAside} />
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <Navbar showAside={showAside} setShowAside={setShowAside} />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 ds-page"
        >
          <div className="">
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='tickets' element={<Tickets />} />
            <Route path='tickets/:id' element={<SingleTicket />} />
            <Route path='problems' element={<Problems />} />
          </Routes>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default Dashboard
