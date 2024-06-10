import React from 'react'
import { Link } from 'react-router-dom'

function SecondSection() {
  return (
    <>
      <div className='w-full flex md:flex-row flex-col justify-between items-center px-8 py-12 bg-primary bg-opacity-15'>
        <section className='w-1/2 flex justify-start'>
          <img src="assets/Home/section2/group-3.svg" className='md:w-[60%]' alt="" />
        </section>
        <section className='md:w-1/2 w-full flex flex-col md:items-start items-center gap-5 py-8'>
          <h1 className='lg:w-[70%] md:w-3/4 lg:text-4xl md:text-2xl font-semibold lg:text-black text-primary font-["Cairo"] '>
          We offer the best services
          </h1>
          <p className='lg:w-3/4 md:text-sm text-lg md:text-start text-center'>
          At Dern-Support, we specialize in delivering tailored IT solutions designed to meet the diverse needs of both businesses and individual customers. Our services include:
          </p>
          <p className='w-full flex items-center text-inline lg:w-3/4 md:text-sm text-lg md:text-start  font-["Cairo"]'>
            <span className='lg:w-fit w-[10%] flex justify-start'>
            <img className='w-fit h-fit mr-2' src="assets/Home/section2/check_circle.png" alt="" />
            </span>
            On-site IT support for businesses
          </p>
          <p className='lg:w-3/4  w-full flex items-center text-inline md:text-sm text-lg md:text-start  font-["Cairo"]'>
            <span className='lg:w-fit w-[10%] flex justify-start'>
            <img className=' w-fit h-fit mr-2' src="assets/Home/section2/check_circle.png" alt="" />
            </span>
            Drop-off or courier service for individual customers
          </p>
          <p className='w-full flex items-center text-inline lg:w-3/4 md:text-sm text-lg md:text-start  font-["Cairo"]'>
            <span className='lg:w-fit w-[10%] flex justify-start'>
            <img className='w-fit h-fit mr-2' src="assets/Home/section2/check_circle.png" alt="" />
            </span>
            Comprehensive repair scheduling and management
          </p>
          <p className='w-full flex items-center text-inline lg:w-3/4 md:text-sm text-lg md:text-start  font-["Cairo"]'>
            <span className='lg:w-fit w-[10%] flex justify-start'>
            <img className='w-fit h-fit mr-2' src="assets/Home/section2/check_circle.png" alt="" />
            </span>
            Access to a detailed knowledge base for DIY troubleshooting
          </p>
          
          <Link to="/support" className='flex justify-center items-center w-40 h-12 rounded-lg border border-primary hover:bg-primary text-black hover:text-white font-["Cairo"] duration-300'>
            Share Your Problem
          </Link>
        </section>

      </div>
    </>
  )
}

export default SecondSection