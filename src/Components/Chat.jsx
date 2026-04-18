// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const Chat = ({ embedded = false }) => {
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


  const shellClass = embedded
    ? 'flex flex-col h-full max-w-full mx-auto border border-slate-200 rounded-2xl shadow-xl bg-gradient-to-b from-white to-slate-50 z-[50]'
    : 'flex flex-col h-full max-w-3xl mx-auto border border-slate-200 rounded-2xl shadow-xl bg-gradient-to-b from-white to-slate-50 z-[50]';

  const content = (
      <div className={shellClass}>
      <div className="py-4 px-6 border-b border-slate-200 bg-white rounded-t-2xl">
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
          <h1 className="text-xl font-semibold text-slate-800">Y1 Assistant</h1>

          <button onClick={() => setMessages([{ text: "Hello Im your friendly AI bot, how can I help you today?", type: 'ai' }])} className="ds-btn-secondary">
            New Chat
          </button>
        </div>
      </div>

      <div
        className={`${embedded ? 'min-h-[340px] max-h-[60vh]' : 'min-h-[570px] max-h-[calc(100vh-300px)]'} flex-1 overflow-y-auto p-6`}
        style={{
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
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-800 shadow-sm border border-slate-200'
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


      <div className="flex p-4 border-t border-slate-200 bg-white rounded-b-2xl shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="ds-input flex-1 mr-2"
        />
        <button
          onClick={handleSend}
          className="ds-btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="ds-page"
    >
      {content}
    </motion.div>
  );
};

export default Chat;
