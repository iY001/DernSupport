// src/components/FloatingSection.js
import React, { useState } from 'react';
import Chat from './Chat'; // Import your Chat component

function FloatingSection() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative">
      <div className={`fixed bottom-10 right-0 m-4 w-full max-w-sm transition-all ease-in ${showChat ? 'translate-y-0' : 'translate-y-[100vh]'}`}>
        <Chat />
      </div>
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {showChat ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 12l6 6 6-6"
            />
          </svg>
        ) : (
          <svg fill="#FFFFFF" className="w-6 h-6 text-white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60">
            <path d="M54,2H6C2.748,2,0,4.748,0,8v33c0,3.252,2.748,6,6,6h28.558l9.702,10.673C44.453,57.885,44.724,58,45,58
	c0.121,0,0.243-0.022,0.36-0.067C45.746,57.784,46,57.413,46,57V47h8c3.252,0,6-2.748,6-6V8C60,4.748,57.252,2,54,2z M12,15h15
	c0.553,0,1,0.448,1,1s-0.447,1-1,1H12c-0.553,0-1-0.448-1-1S11.447,15,12,15z M46,33H12c-0.553,0-1-0.448-1-1s0.447-1,1-1h34
	c0.553,0,1,0.448,1,1S46.553,33,46,33z M46,25H12c-0.553,0-1-0.448-1-1s0.447-1,1-1h34c0.553,0,1,0.448,1,1S46.553,25,46,25z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

export default FloatingSection;
