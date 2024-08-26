import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiUrl from '../../config/ApiUrl';
import Toast from '../../Alerts/Toast';
import { IoTicket } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { FaReply } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

const Loader = () => (
  <div className="bg-gray-100 flex justify-center items-center">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const Home = () => {
  const [data, setData] = useState({
    tickets: [],
    users: [],
    replies: [],
    problems: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ['/tickets', '/user', '/replies', '/problems'];
      const [ticketsRes, usersRes, repliesRes, problemsRes] = await Promise.all(
        endpoints.map(endpoint => ApiUrl.get(endpoint))
      );

      setData({
        tickets: ticketsRes.data || [],
        users: usersRes.data.users || [],
        replies: repliesRes.data.data || [],
        problems: problemsRes.data.data || [],
      });

      if (!ticketsRes.data.length) Toast('info', 'No Tickets found');
      if (!usersRes.data.users.length) Toast('info', 'No Users found');
      if (!repliesRes.data.data.length) Toast('info', 'No Replies found');
      if (!problemsRes.data.data.length) Toast('info', 'No Problems found');
    } catch (error) {
      console.error('Error fetching data:', error);
      Toast('error', error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    { icon: <HiMiniUsers className='text-white'  />, title: 'Users', text: 'User', body: 'View all users', bgColor: 'bg-[#dc3545]', textColor: 'white', opacity: '30', url: 'users', length: data.users.length },
    { icon: <IoTicket className='text-white' />, title: 'Tickets', text: 'Ticket', body: 'View all tickets', bgColor: 'bg-[#0d6efd]', textColor: 'white', opacity: '70', url: 'tickets', length: data.tickets.length },
    { icon: <FaReply className='text-black'  />, title: 'Replies', text: 'Reply', body: 'View all replies', bgColor: 'bg-[#ffc107]', textColor: 'black', opacity: '70', url: 'replies', length: data.replies.length },
    { icon: <MdReportProblem className='text-white'  />, title: 'Problems', text: 'Problem', body: 'View all problems', bgColor: 'bg-[#198754]', textColor: 'white', opacity: '70', url: 'problems', length: data.problems.length },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Home</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className='lg:grid grid-cols-3 flex flex-wrap gap-6'>
          {cards.map(card => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      )}
    </div>
  );
};
const Card = ({title , icon , text , body , bgColor , textColor , opacity , url , length}) => {

  return (
    <>
    <Link to={`/dashboard/${url === undefined ? '' : url }`} className={`w-full p-4 ${bgColor} bg-opacity-${opacity} shadow-lg  rounded-lg overflow-hidden`}>
              <div className="p-4">
                <section className='flex gap-3 items-center'>
                {icon}
                <h2 className={`text-${textColor} text-xl font-bold mb-[1px]`}>{title}</h2>
                </section>
                <p className={`text-${textColor} text-sm mb-4`}>{body}</p>
                <p className={`text-${textColor} text-sm mb-4`}>{length} {text}</p>
              </div>
            </Link>
    </> 
  )
}
export default Home
