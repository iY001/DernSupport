import React, { useEffect, useState } from 'react';
import ApiUrl from '../../config/ApiUrl';
import Toast from '../../Alerts/Toast';
import { useAuth } from '../../Auth/AuthLayout';
import { Link } from 'react-router-dom';

function MyTickets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiUrl.get('/tickets');
        if (res.data.length === 0) {
          Toast('info','No tickets found');
        }
        if (res.status === 200 || res.status === 201) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // Handle error, e.g., show toast message
        Toast( 'error','Failed to fetch tickets');
      } finally {
        setLoading(false); // Set loading to false when data fetching completes
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="spinner-border text-primary" role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Tickets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data
            .filter((ticket) => ticket.userId === user.id)
            .map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
      </div>
    </div>
  );
}

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{ticket.name}</h2>
      <p className="text-gray-600 mb-2">Subject: {ticket.subject}</p>
      <p className="text-gray-600 mb-4">Replies: {ticket.replies.length}</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        {ticket.images?.slice(0, 4).map((image) => (
          <>
           <img key={image.id} src={`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`} alt={image.filename} className="rounded-lg " />
          </>
        ))}
        {
          ticket.images?.length === 0 && <p className="text-gray-600 mb-4">No images</p>
        }
      </div>
      <div className='flex justify-center items-end'>
      <Link to={`/tickets/${ticket.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">View More</Link>
      </div>
    </div>
  );
};

export default MyTickets;
