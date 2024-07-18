import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Problems from '../Pages/Problems/Problems'
import Footer from './../Components/Footer';
import Navbar from './../Components/Navbar';
import Toast from '../Alerts/Toast'
import { useAuth } from '../Auth/AuthLayout'
import Support from '../Pages/Support/Support'
import MyTickets from '../Pages/MyTickets/MyTickets';
import SingleTicket from '../Pages/MyTickets/SingleTicket';
import Dashboard from './../Dashboard/Dashboard';
import Settings from '../Components/Settings';
import PrivateRouter from './PrivateRouter';

function PublicRouter() {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(()=>{
    if(isAuthenticated){
      if(window.location.pathname === '/signin' || window.location.pathname === '/signup'){
        navigate('/home')
        Toast('error', 'Already Logged in')
      }
    }
    if(!isAuthenticated && (location.pathname === '/mytickets' || location.pathname === '/tickets/:id' || location.pathname === '/settings')){
      navigate('/signin')
      Toast('error', 'Please Login First')
    }
  },[isAuthenticated])

  // Check if the current path starts with "/dashboard"
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {
        isAuthenticated === "false" || isAuthenticated === null && (location.pathname === '/signin' || location.pathname === '/signup') ? null :
        !isDashboardRoute ? <Navbar /> : null // Conditionally render Navbar based on the current path
      }
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/support' element={<Support />} />
        <Route path='/problems' element={<Problems />} />
        {
          isAuthenticated ?
          <>
           <Route path='/dashboard/*' element={""} />
           <Route path='/settings' element={<Settings />} />
           <Route path='/mytickets' element={<MyTickets />} /> 
           <Route path='/tickets/:id' element={<SingleTicket />} /> 
          </>
           : location.pathname === '/mytickets' || location.pathname === '/tickets/:id' || location.pathname === '/settings' ? navigate('/signin') : null
        }
        <Route path='*' element={<NotFound />} />
      </Routes>

      {
        user?.role === "admin" ? <PrivateRouter/> : null
      }
            {
        isAuthenticated === "false" || isAuthenticated === null && (location.pathname === '/signin' || location.pathname === '/signup') ? null :
        !isDashboardRoute ? <Footer /> : null // Conditionally render Navbar based on the current path
      }
      
    </>
  );
}

function NotFound() {
  const navigate = useNavigate();

  if (window.location.pathname === '/signup' || window.location.pathname === '/signin' || window.location.pathname === '/settings') {
    return null
  } else {
    Toast('error', 'Page Not Found');
    navigate('/home');
  }

  return null;
}

export default PublicRouter
