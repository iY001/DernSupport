import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
function Questions() {
  const question = [
    {
      question: 'What services does Dern-Support offer?',
      answer : 'Dern-Support specializes in providing technical support for both businesses and individuals. We offer on-site repairs for business customers and options for individuals to drop off their devices or arrange courier services.'
    },
    {
      question: 'How can I request support from Dern-Support?',
      answer : 'You can easily request support by setting up a customer account on our website. Once logged in, you can submit a support request detailing the issue with your device. Our team will promptly respond to schedule a repair and provide a cost estimate.'
    },
    {
      question : "What is included in Dern-Support's knowledge base?",
      answer : "Our knowledge base is a valuable resource for diagnosing and troubleshooting both hardware and software issues. It provides step-by-step instructions to help you resolve minor issues on your own, saving time and inconvenience."
    }
  ]
  return (
    <>
    <div data-aria="fade-down" id='questions' className='w-full pb-14 bg-gray-50 py-12'>
    <section className='flex flex-col justify-center items-center'>
        <h1 className='md:text-sm text-sm text-primary md:text-primary font-bold tracking-[4px] uppercase'>
          About
        </h1>
        <h1 className='md:text-3xl text-2xl text-primary text-md  font-semibold capitalize'>
        Frequently Asked Questions
        </h1>
        </section>

        <section className='w-[80%] flex flex-col justify-center items-center mx-auto py-8 gap-5'>
          { 
            question.map((item, index) => {
              return (
                <Dropdown
                question = {item.question}
                answer = {item.answer}
                />
              )
            })
          }
        </section>
    </div>
    </>
  )
}

const Dropdown = ({question, answer}) => {
  const [showAnswer , setShowAnswer] = useState(false)
  return (
    <>
    <div className='w-full '>
      <div onClick={() => setShowAnswer(!showAnswer)} className={`w-full flex justify-between items-center py-4 bg-primary text-white ${showAnswer ? 'rounded-t-2xl' : 'rounded-2xl'} px-8 cursor-pointer`}>
        <h1 className='md:text-lg text-md text-white font-bold'>
          {question}
        </h1>
        <span  onClick={() => setShowAnswer(!showAnswer)} className='cursor-pointer group'>
        <IoIosArrowDown className={`text-3xl duration-300 ${showAnswer ? 'rotate-180' : ''}`}/>
        </span>
    
      </div>

          <p  className={` ${showAnswer ? 'block md:text-xl text-sm h-full mb-5 w-full px-8 py-4 text-white bg-primary bg-opacity-75 duration-300 rounded-b-2xl group-target:translate-y-0' : 'h-0  '}`}>
            {showAnswer && answer}
          </p>

    </div>
    </>
  )
}

export default Questions