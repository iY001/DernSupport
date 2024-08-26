// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import ApiUrl from '../config/ApiUrl';
import Toast from '../Alerts/Toast';
import { useAuth } from '../Auth/AuthLayout';

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
  </div>
);

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { text: "Hello Im your friendly AI bot, how can I help you today?", type: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, type: 'user' }]);
    setInput('');

    setIsTyping(true);
    try {

      const response = await ApiUrl.post('/aichat/send', { message: input });

      setMessages([...messages, { text: input, type: 'user' }, { text: response.data.reply.text, type: 'ai' }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      Toast('error', error.message || error.data.message || 'Failed to fetch chat response');
      setIsTyping(false);
    }
  };

  const getBackgroundColorClass = (letter) => {
    if (!letter) return 'bg-gray-500';
    const firstLetter = letter.toLowerCase();
    if ('abcdefg'.includes(firstLetter)) return 'bg-red-500';
    if ('hijklm'.includes(firstLetter)) return 'bg-blue-500';
    if ('nopqrst'.includes(firstLetter)) return 'bg-green-500';
    return 'bg-yellow-500';
  };


  return (
    <div className="flex flex-col h-full max-w-lg mx-auto my-8 border border-gray-200 rounded-xl shadow-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 z-[50]">
      <div className="py-4 px-6 border-b border-gray-300 bg-white rounded-t-xl">
        <div className="flex items-center justify-between">
          {/* AI pfp */}
          <div className='relative'>
            <img
              src="https://dern-support-server.vercel.app/images/Y1"
              className="w-10 h-10 rounded-full border-2 "
              alt="profile"
            />
            <span className="absolute bottom-[1px] right-1 ring-4 ring-gray-200 bg-green-600 h-2 w-2 p-1 rounded-full"></span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Y1</h1>

          <button onClick={() => setMessages([{ text: "Hello Im your friendly AI bot, how can I help you today?", type: 'ai' }])} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            New Chat
          </button>
        </div>
      </div>

      <div
        className="min-h-[570px] max-h-[calc(100vh-300px)] flex-1 overflow-y-auto p-6"
        style={{
          backgroundImage: `url('/assets/whatsapp-bg.png')`,
          backgroundSize: 'cover', // Ensure the image covers the container
          backgroundRepeat: 'repeat', // Repeats the image like WhatsApp
          backgroundPosition: 'center', // Center the background image
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            {msg.type === 'ai' && (
              <img
                src="https://dern-support-server.vercel.app/images/Y1"
                className="w-10 h-10 rounded-full border-2 border-green-600 mr-2"
                alt="profile"
              />
            )}
            <div
              className={`inline-block px-4 py-2 rounded-lg ${msg.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
                }`}
            >
              {msg.text}
            </div>
            {msg.type === 'user' && (
              <div
                className={`relative rounded-full ${getBackgroundColorClass(
                  user?.name.charAt(0)
                )} w-10 h-10 rounded-full border-2 border-blue-500 ml-2 flex items-center justify-center text-white text-md`}
              >
                {user?.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>


      <div className="flex p-4 border-t border-gray-300 bg-white rounded-b-xl shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
