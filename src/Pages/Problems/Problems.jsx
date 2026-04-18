import React from 'react'
import SecondSection from './components/SecondSection'

function Problems() {
  return (
    <>

      <div className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Tech Blog</h1>
          <p className="text-lg mb-8">Explore technical solutions and insights from our experts.</p>
          <a href="#blog" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Get Started</a>
        </div>
      </div>
      <SecondSection />
    </>
  )
}
export default Problems 