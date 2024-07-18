import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Users from './components/Users'
import Tickets from './components/Tickets'
import Aside from './components/Aside'
import SingleTicket from './../Pages/MyTickets/SingleTicket';
import Problems from './components/Problems';

function Dashboard() {
  const [showAside, setShowAside] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Aside showAside={showAside} setShowAside={setShowAside} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${showAside ? 'hidden md:block ml-64' : 'block ml-0'}`}>
        <Navbar showAside={showAside} setShowAside={setShowAside} />
        <main className="flex-1 p-4 h-screen bg-gray-100">
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='tickets' element={<Tickets />} />
            <Route path='tickets/:id' element={<SingleTicket />} />
            <Route path='problems' element={<Problems />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
