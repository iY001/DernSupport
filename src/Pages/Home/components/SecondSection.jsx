import React from 'react';
import { Link } from 'react-router-dom';

function SecondSection() {
  return (
    <div className="w-full py-12 bg-gray-50 border shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
        <section className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
          <img 
            src="assets/Home/section2/group-3.svg" 
            className="w-full md:w-3/4 lg:w-2/3 transition-transform duration-500 ease-in-out transform hover:scale-105" 
            alt="Service Illustration" 
          />
        </section>
        <section className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 font-['Segoe UI', 'Roboto', 'Cairo', sans-serif] text-center md:text-left">
            We offer the best services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 text-center md:text-left lg:w-3/4 leading-relaxed">
            At Dern-Support, we specialize in delivering tailored IT solutions designed to meet the diverse needs of both businesses and individual customers. Our services include:
          </p>
          <ul className="lg:w-3/4 list-none space-y-4">
            {[
              "On-site IT support for businesses",
              "Drop-off or courier service for individual customers",
              "Comprehensive repair scheduling and management",
              "Access to a detailed knowledge base for DIY troubleshooting"
            ].map((service, index) => (
              <li key={index} className="flex items-center text-lg text-gray-800 transition-transform duration-300 ease-in-out transform hover:scale-105">
                <img className="w-6 h-6 mr-3" src="assets/Home/section2/check_circle.png" alt="Check mark" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <Link 
            to="/support" 
            className="mt-6 inline-block px-6 py-3 rounded-lg border border-primary text-primary font-medium bg-white hover:bg-primary hover:text-white hover:shadow-lg transition duration-300 ease-in-out"
          >
            Share Your Problem
          </Link>
        </section>
      </div>
    </div>
  );
}

export default SecondSection;
