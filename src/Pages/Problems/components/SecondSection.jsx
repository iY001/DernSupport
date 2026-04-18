import React, { useEffect, useState } from 'react';
import ApiUrl from './../../../config/ApiUrl';
import Toast from '../../../Alerts/Toast';

const SecondSection = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'Hardware', 'Software'
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await ApiUrl.get('/problems');
      if (res.data.length === 0) {
        Toast('info', 'No Tickets found');
      }
      if (res.data?.data || res.status === 200 || res.status === 201) {
        setData(res.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Tickets:', error);
      Toast('error', error.message || error.data.message || 'Failed to fetch Tickets');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on active tab
    if (activeTab === 'all') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(problem => problem.type === activeTab);
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to the first page whenever the active tab or data changes
  }, [activeTab, data]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setModalOpen(false);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id='blog'>
      {/* Tabs */}
      <div className="flex justify-center py-8">
        <button
          className={`px-4 py-2 mx-2 text-sm rounded ${
            activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 mx-2 text-sm rounded ${
            activeTab === 'Hardware' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('Hardware')}
        >
          Hardware
        </button>
        <button
          className={`px-4 py-2 mx-2 text-sm rounded ${
            activeTab === 'Software' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('Software')}
        >
          Software
        </button>
      </div>

      {/* Blog problems Section */}
      <div className="container min-h-screen mx-auto mt-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
              {currentItems.length === 0 ? (
                <p className="text-center text-gray-600">No tickets found.</p>
              ) : (
                currentItems.map(problem => (
                  <div key={problem.id} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer max-h-[500px]" onClick={() => openModal(problem)}>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                        {problem.subject}
                        <span className={`text-sm font-semibold ${problem.isSolved ? 'text-green-500' : 'text-red-500'}`}>
                          {problem.isSolved ? 'Solved' : 'Pending'}
                        </span>
                      </h2>
                      <p className="text-gray-600 text-sm mb-2">
                        By {problem.user.name} | {new Date(problem.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mb-4">{problem.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {problem.images.slice(0, 2).map((image, index) => (
                          <img
                            key={index}
                            src={`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`}
                            alt={image.filename}
                            className="rounded-lg max-h-[100px] object-cover"
                          />
                        ))}
                      </div>
                      {problem.solution && (
                        <div className="p-4 bg-gray-100 mt-4 rounded-lg">
                          <p className="text-green-500 font-semibold">{problem.solution}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-4 py-2 mx-1 text-sm bg-gray-300 rounded-lg"
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 mx-1 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 mx-1 text-sm bg-gray-300 rounded-lg"
                  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedProblem && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full mx-4 md:mx-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                <h1 className='flex flex-col'>
                  <p className='text-sm font-normal text-gray-700'>{selectedProblem.type}</p>
                  {selectedProblem.subject}
                </h1>
                <span className={`text-sm font-semibold ${selectedProblem.isSolved ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedProblem.isSolved ? 'Solved' : 'Pending'}
                </span>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                By {selectedProblem.user.name} | {new Date(selectedProblem.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {selectedProblem.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`}
                    alt={image.filename}
                    className="rounded-lg max-h-[400px] object-cover"
                  />
                ))}
              </div>
              {selectedProblem.solution && (
                <div className="p-4 bg-gray-100 mt-4 rounded-lg">
                  <p className="text-green-500 font-semibold">{selectedProblem.solution}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end p-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const Loader = () => (
  <div className="min-h-[41vh] flex justify-center items-center">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default SecondSection;
