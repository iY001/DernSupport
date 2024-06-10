// problems/Problems.js

import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import ApiUrl from '../../config/ApiUrl';
import Toast from '../../Alerts/Toast';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import { MdKeyboardArrowRight } from "react-icons/md";

const Loader = () => (
  <div className="w-full text-center bg-gray-100 flex justify-center items-center">
    <div className="spinner-border text-primary" role="status">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
);

const showLoadingToast = () => {
  return Swal.fire({
    title: 'Loading...',
    html: '<div className="flex items-center justify-center text-center overflow-hidden" role="status"><svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg><span class="sr-only">Loading...</span></div>',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
};

function Problems() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9); // Number of problems per page
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    fetchProblems();
  }, [trigger]); // Trigger fetchProblems when trigger or currentPage changes

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await ApiUrl.get('/problems');
      if (response.status === 200 || response.status === 201) {
        setProblems(response.data?.data || []);
      } else {
        Toast("error", response?.response?.data?.message || 'Something went wrong');
      }
    } catch (error) {
      Toast("error", error?.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // swal are you sure?
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await ApiUrl.delete(`/problems/${id}`);
          if (res.status === 200 || res.status === 201) {
            Toast("success", res?.data?.message || 'Problem deleted successfully');
            setTrigger(!trigger);
          } else {
            Toast("error", res?.data?.message || 'Failed to delete problem');
          }
        } catch (error) {
          Toast("error", error?.response?.data?.message || 'Something went wrong');
        }
      }
    });
  };

  const handleSolve = async (id) => {
    // swal text field to get the solution
    Swal.fire({
      title: 'Enter your solution',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Solve',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3085d6',
      preConfirm: (solution) => {
        return solveProblem(id, solution);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Toast("success", result?.value?.data?.message || 'Problem solved successfully');
        setTrigger(!trigger);
      }
    });
  };
  const solveProblem = async (id, solution) => {
    const data = { solution };
    console.log(id);
    try {
      const res = await ApiUrl.put(`/problems/solution/${id}` , data);
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        Toast("success", res?.data?.message || 'Problem solved successfully');
        setTrigger(!trigger);
      } else {
        Toast("error", res?.data?.message || 'Failed to solve problem');
      }
    } catch (error) {
      Toast("error", error?.response?.data?.message || 'Something went wrong');
    }
  }

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const filteredProblems = problems.filter(problem =>
    problem.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProblem = currentPage * perPage;
  const indexOfFirstProblem = indexOfLastProblem - perPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Problems</h1>
        <button
          onClick={openAddModal}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          Add Problem
        </button>
      </div>

      {/* Add Problem Modal */}
      {showAddModal && (
        <AddProblemModal
          trigger={trigger}
          setTrigger={setTrigger}
          closeModal={closeAddModal}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {/* Edit Problem Modal */}
      {/* {showEditModal && (
        <EditProblemModal
          problem={selectedProblem}
          trigger={trigger}
          setTrigger={setTrigger}
          closeModal={() => setShowEditModal(false)}
          loading={loading}
          setLoading={setLoading}
        />
      )} */}

        {/* Search Field */}
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
        
      {/* Problem List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && currentProblems.length === 0 ? (
          <p className="text-center">No problems found.</p>
        ) : (
          currentProblems.map((problem) => (
            <>
            
            <div
              key={problem.id}
              className="bg-white border border-gray-200  rounded-lg shadow-sm h-fit"
            >
              <section className='flex items-start justify-between p-4 '>
                <h2 className="w-[80%] text-lg font-medium text-gray-800 mb-2 flex flex-col break-words">{problem.subject}
                {
                  problem.isSolved ? <span className='text-sm text-green-500'>Solved</span> : <span className='text-sm text-red-500'>Pending</span>
                
                }
              <p className="text-sm text-gray-600 mb-4">{problem.type}</p>
              <p className="text-sm text-gray-600 mb-4">{problem.description }</p>
                </h2>
                
                <section className='flex flex-col gap-2'>
                <button disabled={loading} onClick={() => handleDelete(problem.id)} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>
                  Delete
                </button>
                <button onClick={() => handleSolve(problem.id)} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                  Solve
                </button>
                </section>

                {/* <button
                  onClick={() => {
                    setSelectedProblem(problem);
                    setShowEditModal(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button> */}
              </section>
              <section className='px-4 py-2'>

              <p className="text-xs text-gray-400">Created at: {new Date(problem.createdAt).toLocaleDateString()}</p>
              {/* Preview images */}
              {problem.images?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {problem?.images?.slice(0, 2).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        key={image.id}
                        src={`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`}
                        alt={image.filename}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
              </section>
              
              {/* Add more details or buttons as needed */}
              {
                problem.solution && (
                  <>
                  <p className="text-sm text-gray-600 mb-4 px-4">Solution: </p>
                  <p className="py-2 px-4 w-full text-sm text-gray-600 rounded-b-lg bg-gray-300">{problem.solution}</p>
                  </>
                )
              }
            </div>
            </>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && problems.length > perPage && (
        <div className="mt-4 px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Previous page button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <span className="sr-only">Previous</span>
              {/* Heroicon name: solid/chevron-left */}
              <MdKeyboardArrowRight className='rotate-180'/>
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.ceil(problems.length / perPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === i + 1 ? 'z-10 bg-gray-100' : 'hover:text-gray-500'}`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next page button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(problems.length / perPage)}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === Math.ceil(problems.length / perPage) ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <span className="sr-only">Next</span>
              {/* Heroicon name: solid/chevron-right */}
              <MdKeyboardArrowRight/>
            </button>
          </nav>
        </div>
      )}

      {/* Loading indicator */}
      {loading && <Loader />}
    </>
  );
}

const AddProblemModal = ({ trigger, setTrigger, closeModal , loading , setLoading }) => {
  const [formData, setFormData] = useState({
    subject: '',
    type: 'Hardware',
    customType: false,
    description: '',
    files: [], // Store an array of files
    imagePreviews: [], // Array to store image preview URLs
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      const selectedFiles = Array.from(files);
      const validImageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

      setFormData((prevData) => ({
        ...prevData,
        files: [...prevData.files, ...validImageFiles],
      }));

      const newPreviews = validImageFiles.map(file => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
    else if (e.target.name === 'customType') {
      setFormData({
        ...formData,
        customType: e.target.checked,
        type: e.target.checked ? '' : 'Hardware',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = formData.files.filter((file, i) => i !== index);
    const updatedPreviews = formData.imagePreviews.filter((preview, i) => i !== index);

    setFormData({
      ...formData,
      files: updatedImages,
      imagePreviews: updatedPreviews,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.subject || !formData.type) {
        Toast('error', 'Please fill all the required fields');
        return;
      }

      const formDataToSend = new FormData();

      // Append files to FormData
      formData.files.forEach(file => {
        formDataToSend.append('files', file);
        formDataToSend.append('fileName', formData.files[0]?.name.split('.').slice(0, -1).join('.'));
      });

      // Append other fields
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('description', formData.description);

      // Send FormData to server
      const res = await ApiUrl.post('/problems', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response
      if (res.status === 201 || res.status === 200) {
        setTrigger(!trigger);
        setLoading(false);
        closeModal();
        Toast("success", res?.data?.message || 'Problem added successfully');
      } else {
        Toast("error", res?.response?.data?.message || res?.response?.data?.validationErrors?.[0]?.message || 'Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      Toast("error", error?.response?.data?.message || error?.response?.data?.validationErrors?.[0]?.message || 'Something went wrong');
    }
  };
  const handleImageChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);
    const validImageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...validImageFiles],
      imagePreviews: [...prevData.imagePreviews, ...validImageFiles.map(file => URL.createObjectURL(file))],
    }));
  };

  return (
    <>
    
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="relative mx-auto lg:min-w-[600px] md:min-w-[400px] min-w-[300px] bg-white rounded-lg shadow-lg">
            <div className="flex justify-between px-4 items-center py-3 pr-4 border-b-2 border-gray-200 rounded-t-xl">
              <h1 className="text-lg text-primary font-['Cairo']">Add Problem</h1>
              <button
                onClick={() => {
                  closeModal();
                }}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-b-xl">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <div className="flex justify-between w-full">
                  <label htmlFor="customType" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <section className='flex items-center gap-2'>
                    <label htmlFor="customType">
                      <span className="text-sm font-medium text-gray-700">Custom Type</span>
                    </label>
                    <input
                      type="checkbox"
                      id="customType"
                      name="customType"
                      checked={formData.customType}
                      onChange={handleChange}
                      className={`h-5 w-5 ${formData.customType ? 'checked bg-primary' : ''} text-primary focus:ring-primary border-gray-300 border-2 rounded appearance-none transition-colors duration-200 cursor-pointer`}
                    />
                  </section>

                  </div>

                  {formData.customType ? (
                    <input
                      type="text"
                      id="customTypeValue"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className=" mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Enter custom type"
                      required
                    />
                  ) : (
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    >
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                    </select>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Enter description"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Images
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {formData.imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="rounded-lg h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        onClick={() => handleImageDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    Add Problem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

// const EditProblemModal = ({ problem, setTrigger, trigger, closeModal }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     subject: problem.subject,
//     description: problem.description,
//     type: problem.type,
//     customType: problem.type !== 'Hardware' || "Software" ? true : false,
//     files: problem.images,
//     imagePreviews: problem.images,
//   });

//   console.log(formData.imagePreviews);
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));

//   };

//   const handleImageDelete = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       files: prevData.files.filter((file, i) => i !== index),
//       imagePreviews: prevData.imagePreviews.filter((preview, i) => i !== index),
//     }));
//   };

//   const handleImageChange = (e) => {
//     const { files } = e.target;
//     const selectedFiles = Array.from(files);
//     const validImageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

//     setFormData((prevData) => ({
//       ...prevData,
//       files: [...prevData.files, ...validImageFiles],
//       imagePreviews: [...prevData.imagePreviews, ...validImageFiles.map(file => URL.createObjectURL(file))],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { subject, description, type, files } = formData;

//     const formDataToSend = new FormData();
//     files.forEach(file => {
//       formDataToSend.append('files', file);
//     });
//     formDataToSend.append('subject', subject);
//     formDataToSend.append('description', description);
//     formDataToSend.append('type', type);

//     try {
//       const response = await ApiUrl.put(`/problems/${problem.id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200 || response.status === 201) {
//         Toast("success", response.data.message || 'Problem updated successfully');
//         setTrigger(!trigger); // Trigger a refresh
//         closeModal();
//       } else {
//         Toast("error", response.data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Toast("error", error.response?.data?.message || 'Something went wrong');
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
//         <div className="fixed inset-0 bg-black opacity-50"></div>

//         <div className="relative mx-auto lg:min-w-[600px] md:min-w-[400px] min-w-[300px] bg-white rounded-lg shadow-lg">
//           <div className="flex justify-between px-4 items-center py-3 pr-4 border-b-2 border-gray-200 rounded-t-xl">
//             <h1 className="text-lg text-primary font-['Cairo']">Edit Problem</h1>
//             <button
//               onClick={closeModal}
//               className="text-gray-400 hover:text-gray-500 focus:outline-none"
//               aria-label="Close modal"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-b-xl">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                   placeholder="Enter name"
//                   required
//                 />
//               </div>
//               <div className="mb-4 flex flex-col items-start">
//                 <div className="flex justify-between w-full">
//                   <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//                     Type
//                   </label>
//                   <section className="flex items-center gap-2">
//                     <label htmlFor="customType">
//                       <span className="text-sm font-medium text-gray-700">Custom Type</span>
//                     </label>
//                     <input
//                       type="checkbox"
//                       id="customType"
//                       name="customType"
//                       checked={formData.customType}
//                       onChange={handleChange}
//                       className={`h-5 w-5 ${formData.customType ? 'checked bg-primary' : ''} text-primary focus:ring-primary border-gray-300 border-2 rounded appearance-none transition-colors duration-200 cursor-pointer`}
//                     />
//                   </section>
//                 </div>

//                 {formData.customType ? (
//                   <input
//                     type="text"
//                     id="customTypeValue"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                     placeholder="Enter custom type"
//                     required
//                   />
//                 ) : (
//                   <select
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                     required
//                   >
//                     <option value="Hardware">Hardware</option>
//                     <option value="Software">Software</option>
//                   </select>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                   placeholder="Enter description"
//                   rows={4}
//                   required
//                 ></textarea>
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="images" className="block text-sm font-medium text-gray-700">
//                   Images
//                 </label>
//                 <input
//                   type="file"
//                   id="images"
//                   name="images"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 {formData.imagePreviews.map((preview, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={`data:${preview.type};base64,${preview.url}`}
//                       alt={`Preview ${index + 1}`}
//                       className="rounded-lg h-40 w-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                       onClick={() => handleImageDelete(index)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
//                 >
//                   {loading ? 'Updating...' : 'Update Problem'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
export default Problems;
