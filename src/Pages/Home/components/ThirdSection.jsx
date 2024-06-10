import React from 'react'
import { Link } from 'react-router-dom'

function ThirdSection() {
  return (
    <>
    <div className='w-full flex flex-col justify-center items-center text-center py-10 '>
    <section className='lg:w-[60%]  md:w-[80%] w-[90%] min-w-[300px] py-36 rounded-2xl flex flex-col justify-center items-center gap-5 bg-primary bg-opacity-50'>
      <h1 className=' text-2xl text-black font-["Cairo"]'>
      The Perfect Solution to your IT Problems
      </h1>
      <p className='lg:w-1/3 text-center text-lg text-black font-["Cairo"]'>
      The perfect solution to your IT problems awaits at Dern-Support, where tailored services ensure seamless resolutions and reliable support
      </p>
      <button>
      <Link to={"/signup"} className='flex justify-center bg-white items-center w-40 h-12 rounded-lg border border-primary hover:bg-primary text-black hover:text-white font-["Cairo"] duration-300'>
        Get Started
      </Link>
      </button>
    </section>

    </div>
    </>
  )
}

export default ThirdSection