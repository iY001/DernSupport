import React from 'react'
import { Link } from 'react-router-dom'

function FirstSection() {
  return (
    <>
        <div className='w-full flex md:flex-row flex-col-reverse justify-between items-center px-20 py-12'>
      <section className='md:w-1/2 w-full flex flex-col md:items-start items-center gap-5'>
        <h1 className='lg:w-[70%] md:w-3/4 lg:text-4xl md:text-2xl font-semibold lg:text-black text-primary font-["Cairo"] '>
        Enhancing IT Support Experiences Together
        </h1>
        <p className='lg:w-3/4 md:text-sm text-lg md:text-start text-center'>
        Empowering customers with effective solutions for their IT challenges through streamlined support and comprehensive service at Dern-Support.
        </p>
        <Link to={"/signup"} className='flex justify-center items-center w-40 h-12 rounded-lg border border-primary hover:bg-primary text-primary hover:text-white font-["Cairo"] duration-300'>
          Get Started
        </Link>
      </section>
      <section className='w-1/2 flex justify-end'>
      <img src="assets/Home/hero-group-2.png" className='md:w-[60%]' alt="" />
      </section>
    </div>
    </>
  )
}

export default FirstSection