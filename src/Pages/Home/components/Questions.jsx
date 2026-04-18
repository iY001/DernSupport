import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function Questions() {
  const question = [
    {
      question: 'What services does Dern-Support offer?',
      answer: 'Dern-Support specializes in providing technical support for both businesses and individuals. We offer on-site repairs for business customers and options for individuals to drop off their devices or arrange courier services.'
    },
    {
      question: 'How can I request support from Dern-Support?',
      answer: 'You can easily request support by setting up a customer account on our website. Once logged in, you can submit a support request detailing the issue with your device. Our team will promptly respond to schedule a repair and provide a cost estimate.'
    },
    {
      question: "What is included in Dern-Support's knowledge base?",
      answer: "Our knowledge base is a valuable resource for diagnosing and troubleshooting both hardware and software issues. It provides step-by-step instructions to help you resolve minor issues on your own, saving time and inconvenience."
    }
  ];

  return (
    <div id="questions" className="w-full pb-16 bg-gray-50 py-12 border shadow-sm">
      <section className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-sm text-primary font-bold tracking-widest uppercase mb-2">
          About
        </h1>
        <h2 className="text-3xl text-gray-900 font-semibold capitalize">
          Frequently Asked Questions
        </h2>
      </section>

      <section className="w-[90%] lg:w-[80%] flex flex-col justify-center items-center mx-auto gap-6">
        {question.map((item, index) => (
          <Dropdown key={index} question={item.question} answer={item.answer} />
        ))}
      </section>
    </div>
  );
}

const Dropdown = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="w-full ">
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className={`w-full flex justify-between items-center py-4 px-6 bg-primary text-white cursor-pointer rounded-xl transition-shadow duration-300 ease-in-out ${showAnswer ? 'shadow-lg' : 'shadow-md'}`}
      >
        <h3 className="text-lg font-bold">{question}</h3>
        <IoIosArrowDown
          className={`text-2xl transition-transform duration-300 ease-in-out ${showAnswer ? 'transform rotate-180' : ''}`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${showAnswer ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="w-full bg-white text-gray-800 rounded-b-xl px-6 py-4 shadow-lg">
          <p className="text-base">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
