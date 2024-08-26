import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 lg:p-8">
          <h1 className="text-3xl font-semibold text-gray-800">About Me</h1>
          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <img src="http://dern-support-server.vercel.app/images/Y1" className="w-20 h-20 rounded-full" alt="" />
                <div className='absolute rounded-full right-2 bottom-0 p-2 bg-green-500 border-4 border-green-600'>

                </div>
              </div>
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">Yousef Abdelaziz</h2>
              <p className="text-gray-600">
                Full Stack Developer
              </p>
              <p className="flex items-center text-gray-600 mt-2">
                <HiLocationMarker className="text-gray-500 mr-2" />
                El Mansoura, Ad Daqahliyah, Egypt
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
            <p className="text-gray-600 mt-2">
              Passionate Full Stack Developer | React & Node.js Enthusiast <br />
              Graduated from We School with honed skills as a Full Stack Developer, focusing on the React framework for frontend and Node.js for backend development. Equipped with a comprehensive understanding of both frontend and backend technologies, I thrive in developing end-to-end solutions that seamlessly integrate user experience with robust server-side functionalities. <br />
              Actively involved in various projects which I've applied my skills in Full Stack Development to tackle real-world challenges and deliver innovative solutions. <br />
              Engaged in freelance opportunities to further refine my expertise, collaborating with clients to develop bespoke web applications tailored to their specific needs and requirements. <br />
              Feel free to reach out to me via LinkedIn messaging or at <a href="mailto:youssef.abdelaziz.dev@gmail.com" className="text-blue-500">youssef.abdelaziz.dev@gmail.com</a> to discuss potential collaboration opportunities or to simply connect and share insights within the tech community. I'm always eager to engage in meaningful discussions and explore new avenues in the world of technology.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
            <ul className="mt-2">
              <li className="flex items-center text-gray-600 mt-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <a href="mailto:youssef.abdelaziz.dev@gmail.com" className="text-blue-500">youssef.abdelaziz.dev@gmail.com</a>
              </li>
              <li className="flex items-center text-gray-600 mt-2">
                <FaLinkedin className="text-gray-500 mr-2" />
                <a href="https://www.linkedin.com/in/y001/" className="text-blue-500">LinkedIn</a>
              </li>
              <li className="flex items-center text-gray-600 mt-2">
                <FaGithub className="text-gray-500 mr-2" />
                <a href="https://github.com/iY001" className="text-blue-500">GitHub</a>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Education</h3>
            <p className="text-gray-600 mt-2">
              We School for Applied Technology <br />
              January 2022 - March 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;