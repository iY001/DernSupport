import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Auth/AuthLayout';

function ThirdSection() {
  const { user } = useAuth();
  
  return (
    <div className="w-full flex flex-col justify-center items-center text-center py-16 bg-white">
      <section className="flex flex-col items-center gap-8 w-full max-w-4xl p-12 bg-gray-100 border rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 font-['Segoe UI', 'Roboto', 'Cairo', sans-serif]">
          The Perfect Solution to Your IT Problems
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed px-4 max-w-2xl">
          The perfect solution to your IT problems awaits at Dern-Support, where tailored services ensure seamless resolutions and reliable support.
        </p>
        <Link 
          to="/signup" 
          className="mt-4 inline-block px-8 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-dark hover:shadow-lg transition duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default ThirdSection;
