import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";
import ApiUrl from '../../config/ApiUrl'; // Adjust path as per your project structure
import Toast from '../../Alerts/Toast'; // Adjust path as per your project structure
import { IoIosSearch } from "react-icons/io";
import Tickets from './Tickets';
import { Link } from 'react-router-dom';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6); // Number of users per page
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track the user selected for editing
  const [trigger, setTrigger] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ApiUrl.get('/user'); // Adjust endpoint as per your API
        if (res.status === 200 || res.status === 201) {
          setUsers(res.data.users);
        } else {

          Toast('error', res?.data?.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        Toast('error', error.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, [trigger]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Filter logic
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle previous and next buttons
  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? currentPage : currentPage + 1);
  };

  // Function to render pagination buttons
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    // Logic to handle "..."
    const maxButtonsToShow = 5;
    let buttonsToShow = pageNumbers.slice(0, maxButtonsToShow);
    const lastPage = pageNumbers[pageNumbers.length - 1];

    if (currentPage > maxButtonsToShow - 2) {
      const start = Math.max(0, currentPage - 3);
      buttonsToShow = pageNumbers.slice(start, start + maxButtonsToShow);
    }


    return (
      <ul className="pagination flex justify-center items-center mt-4">
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={handlePrevPage} className="page-link px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              Prev
            </button>
          </li>
        )}
        {buttonsToShow.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              {number}
            </button>
          </li>
        ))}
        {currentPage !== lastPage && (
          <>
            {lastPage > maxButtonsToShow && (
              <li className="page-item">
                <button onClick={() => paginate(lastPage)} className="page-link px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md">
                  ...
                </button>
              </li>
            )}
            <li className="page-item">
              <button onClick={handleNextPage} className="page-link px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                Next
              </button>
            </li>
          </>
        )}
      </ul>
    );
  };

  // Function to handle edit action
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleAction = (action, user) => {
    const handleDelete = async (userId) => {
      try {
        const res = await ApiUrl.delete(`/user/${userId}`);
        if (res.status === 200 || res.status === 201) {
          setTrigger(!trigger);
          Toast('success', 'User deleted successfully');
        } else {
          Toast('error', 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        Toast('error', 'Failed to delete user');
      }
    };

    if (action === 'edit') {
      handleEdit(user);
    }
    if (action === 'delete') {
      handleDelete(user.id);
    }
  };

  // Modal logic for editing user (to be implemented)
  const handleEditModal = () => {
    // Implement modal for editing user details
  };

  const toggleDropdown = (user) => {
    if (selectedUser === user) {
      setIsOpen(!isOpen);
    }
  };

  const openModal = () => {
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };
  return (
    <div className="container h-screen mx-auto px-4 py-8 bg-gray-100">
      <section className='flex justify-between py-4 w-full'>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
        <button onClick={openModal} className="bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded">Add User</button>
      </section>
      <div className="overflow-x-scroll md:min-w-full max-w-[310px] mx-auto h-full">
        <div className="shadow lg:overflow-x-hidden  md:min-w-full max-w-[310px]  overflow-x-scroll border-b border-gray-200 sm:rounded-lg">
          <table className="lg:min-w-full lg:overflow-x-auto w-fit overflow-x-scroll z-10 divide-y bg-white divide-gray-200">
            <div className="relative lg:w-[50%] w-full py-2">
              <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
                <IoIosSearch />
              </div>
              <input
                type="text"
                className="block w-full ml-4 py-2.5 pl-8 pr-10 text-sm rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th scope="col" className="flex flex-col px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">Tickets</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">Replies</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Cairo']">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap font-['Cairo']">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-['Cairo']">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-['Cairo']">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-['Cairo']">
                    <button className="bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded" onClick={() => { setSelectedUser(user); setShowTicketsModal(true) }}>
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-['Cairo']">{user.replies.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 font-['Cairo']">
                    {/* Dropdown for actions */}
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="text-black font-['Cairo'] bg-white border-2 border-primary hover:bg-primary hover:text-white focus:text-white focus:bg-primary focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-3"
                        onClick={() => {
                          setSelectedUser(user); // Set selected user for actions
                          toggleDropdown(user); // Toggle dropdown
                        }}
                      >
                        Actions
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-300 ${isOpen && selectedUser === user ? 'transform rotate-180' : ''}`}
                          viewBox="0 0 10 6"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {isOpen && selectedUser === user && (
                        <div className="absolute right-0 z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-primary font-['Cairo']"
                            onClick={() => handleAction('edit', selectedUser)}
                          >
                            <MdEdit className="inline-block mr-2" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 font-['Cairo']"
                            onClick={() => handleAction('delete', selectedUser)}
                          >
                            <MdDelete className="inline-block mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4">
          <nav className="flex justify-center">
            {renderPagination()}
          </nav>
        </div>
      </div>
      {showAddModal && (
        <AddModel trigger={trigger} setTrigger={setTrigger} closeModal={closeModal} />
      )}
      {showEditModal && (
        <EditModel user={selectedUser} trigger={trigger} setTrigger={setTrigger} closeModal={() => setShowEditModal(false)} />
      )}
      {
        showTicketsModal && (
          <TicketsModel Tickets={selectedUser?.tickets} closeModal={() => setShowTicketsModal(false)} trigger={trigger} setTrigger={setTrigger}/>
        )
      }
    </div>
  );
};


const AddModel = ({ trigger, setTrigger, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user', // Default role is 'user'
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiUrl.post('/user', formData);
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        setTrigger(!trigger);
        Toast("success", res?.data?.message || 'User added successfully');
        closeModal();
      }
      else {
        Toast("error", res?.response?.data?.message || res.response?.data?.validationErrors?.[0]?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      Toast("error", error?.response?.data?.message || error.response?.data?.validationErrors?.[0]?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="relative mx-auto lg:min-w-[600px] md:min-w-[400px] min-w-[300px] bg-white rounded-lg shadow-lg">
          {/* Modal content */}
          <div className="flex justify-between px-4 items-center py-3 pr-4 border-b-2 border-gray-200 rounded-t-xl">
            <h1 className="text-lg text-primary font-['Cairo']">
              Add User
            </h1>
            <button
              onClick={closeModal}
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
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const EditModel = ({ user, trigger, setTrigger, closeModal }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiUrl.put(`/user/${user.id}`, formData);
      if (res.status === 200 || res.status === 201) {
        setTrigger(!trigger);
        Toast('success', 'User updated successfully');
        closeModal();
      } else {
        Toast('error', 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Toast('error', 'Failed to update user');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="relative mx-auto lg:min-w-[600px] md:min-w-[400px] min-w-[300px] bg-white rounded-lg shadow-lg">
          {/* Modal content */}
          <div className="flex justify-between px-4 items-center py-3 pr-4 border-b-2 border-gray-200 rounded-t-xl">
            <h1 className="text-lg text-primary font-['Cairo']">
              Edit User
            </h1>
            <button
              onClick={closeModal}
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
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const TicketsModel = ({ Tickets, closeModal , trigger , setTrigger }) => {
  console.log(Tickets);
  const handleDelete = async (id) => {
    try {
      const response = await ApiUrl.delete(`/tickets/${id}`);
      if (response.status === 200) {
        setTrigger(!trigger);
        Toast('success', 'Ticket deleted successfully');
        closeModal();
      } else {
        Toast('error', 'Failed to delete ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      Toast('error', 'Failed to delete ticket');
    }
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="relative mx-auto lg:min-w-[600px] md:min-w-[400px] min-w-[300px] bg-white rounded-lg shadow-lg">
          {/* Modal content */}
          <div className="flex justify-between px-4 items-center py-3 pr-4 border-b-2 border-gray-200 rounded-t-xl">
            <h1 className="text-lg text-primary font-['Cairo']">
              Tickets <span className="text-white bg-primary p-[4px] rounded-full">{Tickets?.length}
                </span>
            </h1>
            <button
              onClick={closeModal}
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
          <div className="p-4 bg-gray-100 rounded-b-xl max-h-[500px] overflow-y-auto">
            {/* Tickets */}
            {
              Tickets?.map((ticket, index) => {
                return (
                  <>

                    <div key={index} className=" bg-white rounded-md mb-4">
                      <section className='p-4'>

                      <section className='flex justify-between'>
                      <h2 className="text-xl font-semibold mb-2">{ticket.subject}</h2>
                      <button onClick={() => handleDelete(ticket.id)} className='text-gray-600'>
                        <MdDelete/>
                      </button>
                      </section>
                      <p className="text-gray-600 text-sm mb-4 break-words max-w-[600px]">{ticket.description.slice(0, 90) + '...'}</p>
                      <p className="text-gray-600 text-sm mb-4">Status: {ticket.status}</p>
                      <p className="text-gray-600 text-sm mb-4">Created At: {new Date(ticket.createdAt).toLocaleTimeString('en-CA', { year: 'numeric', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                      </section>

                    <div className='w-full flex justify-center rounded-b-md'>
                    <Link to={`/dashboard/tickets/${ticket?.id}`} className="p-2 text-center text-white bg-primary hover:bg-opacity-90 w-full hover:text-primary-dark font-['Cairo'] rounded-b-md">
                      View Ticket
                    </Link>
                    </div>
                    </div>
                  </>
                )
              })
            }

          </div>
        </div>
      </div>
    </>
  )
}
export default Users;
