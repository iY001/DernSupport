import React from 'react'
import Dashboard from './../Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';

function PrivateRouter() {
  return (
    <>
    <Routes>
        <Route path='/dashboard/*' element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default PrivateRouter