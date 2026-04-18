import React, { useEffect, useRef, useState } from 'react';
import 'flickity/dist/flickity.css';
import '../../../style/Flickity.css';
import Flickity from 'flickity';
import ApiUrl from './../../../config/ApiUrl';
import Toast from './../../../Alerts/Toast';

// Loader component using Tailwind CSS classes


function FirstSection({ loading, setLoading }) {
  const [data, setData] = useState([]);
  const [filterdData, setFilterdData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await ApiUrl.get('/tickets');
        if (res.data.length === 0) {
          Toast('info', 'No Tickets found');
        }
        if (res.status === 200 || res.status === 201) {
          setData(res.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching Tickets:', error);
        Toast('error', 'Failed to fetch Tickets');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilterdData(data.sort((a, b) => b.replies.length - a.replies.length));
    }
  }, [data, loading]);

  const flickityRef = useRef(null);
  useEffect(() => {
    flickityRef.current = new Flickity('.main-carousel', {
      autoPlay: true,
      pageDots: false,
    });
  }, [filterdData]);

  return (
    <div className='my-4'>
            

      {/* Conditional rendering based on loading state */}
      {loading ? null : (
        <div className="main-carousel" data-flickity='{ "autoPlay": true }'>
          {filterdData.slice(0, 3).map((ticket) => (
            <UserComment key={ticket.id} name={ticket.user.name} info={ticket.user.email} subject={ticket.subject} solved={true} />
          ))}
        </div>
      )}
    </div>
  );
}

function User({ name, info }) {
  return (
    <div className="flex flex-col">
      <img src="/assets/Comment/user.png" className="w-fit mx-auto" alt="" />
      <h1 className="text-md font-medium">{name}</h1>
      <p className="text-sm font-normal text-gray">{info}</p>
    </div>
  );
}

function UserComment({ name, info, subject, solved }) {
  return (
    <div className='carousel-cell w-full bg-[#F9FAFB] flex flex-col mx-auto text-center py-16 my-8'>
      <section className="flex items-center justify-center gap-4">
        <img src="/assets/Comment/Comment - Icon.png" alt="" />
        <h1 className="text-lg font-bold">{solved ? "Solved" : "Unsolved"}</h1>
      </section>
      <h1 className="lg:text-6xl md:text-2xl text-md px-4 py-6 font-medium">
        {subject}
      </h1>
      <section className="py-8">
        <User name={name} info={info} />
      </section>
    </div>
  );
}

export default FirstSection;
