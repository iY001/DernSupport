import React from 'react'
import { Link } from 'react-router-dom'

function ForthSection() {
  return (
    <>
      <div className="w-full py-16 bg-primary text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8" data-aos="fade-up">
          <section className="w-full flex flex-col items-center text-center gap-6" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-['Segoe UI', 'Roboto', 'Cairo', sans-serif] text-center md:text-left">
              Tailored IT Solutions
            </h2>
            <p className="md:w-[50%] w-full text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Whether you are a business or an individual, Dern-Support offers customized IT solutions that are tailored to your specific needs. Discover how we can help you achieve your IT goals with precision and expertise.
            </p>
            <Link
              to="/support"
              className="mt-6 inline-block px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-gray-100 hover:text-primary-dark hover:shadow-lg transition duration-300 ease-in-out"
            >
              Contact Us Today
            </Link>
          </section>
          {/* <section className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0" data-aos="fade-left">
            <img
              src="assets/Home/section4/solutions.png"
              className="w-full md:w-3/4 lg:w-2/3"
              alt="Tailored Solutions Illustration"
            />
          </section> */}
        </div>
      </div>
    </>
  )
}

export default ForthSection