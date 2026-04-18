import React, { useEffect, useState } from 'react';
import ApiUrl from '../../config/ApiUrl';
import Toast from '../../Alerts/Toast';
import { useParams } from 'react-router-dom';
import { useAuth } from './../../Auth/AuthLayout';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import ImageGallery from 'react-image-gallery';

const SingleTicket = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Assuming useAuth provides user details
  const [ticket, setTicket] = useState({});
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [imagesfilenames , setImagesfilenames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await ApiUrl.get(`/tickets/${id}`);
        setTicket(res.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setError('Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
    setImagesfilenames(ticket?.images?.map(image => image.filename));

  }, [id]);


  const openModal = (imageURL) => {
    setPreviewImage(imageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPreviewImage('');
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = editingReplyId
        ? await ApiUrl.put(`/replies/${editingReplyId}`, { body: replyMessage })
        : await ApiUrl.post(`/replies/${ticket.id}`, { body: replyMessage, ticketId: ticket.id });

      if (res.status === 201 || res.status === 200) {
        const updatedReplies = editingReplyId
          ? ticket.replies.map(reply => (reply.id === editingReplyId ? { ...reply, body: replyMessage } : reply))
          : [...ticket.replies, res.data];

        setTicket({ ...ticket, replies: updatedReplies });
        Toast("success", editingReplyId ? 'Reply updated successfully' : 'Reply added successfully');
        setReplyMessage('');
        setEditingReplyId(null);
        setError(null);
      } else {
        Toast("error", editingReplyId ? 'Failed to update reply' : 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error handling reply:', error);
      Toast("error", editingReplyId ? 'Failed to update reply' : 'Failed to add reply');
      setError(editingReplyId ? 'Failed to update reply' : 'Failed to add reply');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReply = async (replyId) => {
    setLoading(true);

    try {
      const res = await ApiUrl.delete(`/replies/${replyId}`);

      if (res.status === 200) {
        const filteredReplies = ticket.replies.filter(reply => reply.id !== replyId);
        setTicket({ ...ticket, replies: filteredReplies });
        Toast("success", 'Reply deleted successfully');
        setError(null);
      } else {
        Toast("error", 'Failed to delete reply');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      Toast("error", 'Failed to delete reply');
      setError('Failed to delete reply');
    } finally {
      setLoading(false);
    }
  };

  const handleEditReply = (reply) => {
    setReplyMessage(reply.body);
    setEditingReplyId(reply.id);
  };

  const cancelEdit = () => {
    setReplyMessage('');
    setEditingReplyId(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-h-screen">
      {loading && <div className="text-center py-2">Loading...</div>}
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <div className="mb-4 w-[80%] mx-auto">
        <h2 className="text-xl font-semibold">{ticket.subject}</h2>
        <p className="text-gray-600 mb-4">{ticket.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {ticket.images?.map((image) => (
            <img
              key={image.id}
              alt={image.filename}
              onClick={() => openModal(`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`)}
              src={`${process.env.REACT_APP_BASE_URL}/images/${image.filename}`}
              className="rounded-lg w-full max-h-[500px] object-cotain"
            />
          ))}
        </div>
      </div>

      {/* Replies Section */}
      <h3 className="text-lg font-semibold mb-2 text-center text-primary">Replies</h3>
      <div className="mb-4 w-[80%] mx-auto border-2 rounded-lg shadow-lg max-h-96 overflow-y-auto p-12">
        {ticket.replies?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {ticket.replies.map((reply) => (
              <li key={reply.id} className="py-4 w-full">
                <div className="flex space-x-3">
                  <img 
                    src={`https://avatars.dicebear.com/api/human/${reply.id}.svg`} 
                    alt="avatar" 
                    className="h-10 w-10 rounded-full flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{reply.user}</h4>
                      <section className='flex flex-col items-end'>
                        {reply?.userId === user?.id && (
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              className="text-sm text-gray-500 hover:text-primary focus:outline-none"
                              onClick={() => handleEditReply(reply)}>
                              <MdEdit />
                            </button>
                            <button
                              className="text-sm text-gray-500 hover:text-red-600 focus:outline-none"
                              onClick={() => handleDeleteReply(reply.id)}>
                              <MdDelete />
                            </button>
                          </div>
                        )}
                        <p className="text-sm text-gray-500 text-end text-nowrap">
                          {new Date(reply.createdAt).toLocaleDateString('en-CA')} {new Date(reply.createdAt).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                      </section>
                    </div>
                    <p className="text-sm text-gray-500 break-words">{reply?.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No replies yet.</p>
        )}
      </div>

      {/* Reply Form */}
      <form className="w-[80%] mx-auto" onSubmit={handleSubmitReply}>
        <label htmlFor="replyMessage" className="block text-sm font-medium text-gray-700 mb-2">
          {editingReplyId ? 'Editing a reply:' : 'Add a reply:'}
        </label>
        <textarea
          id="replyMessage"
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          rows="3"
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          required
        />
        <div className="flex justify-end space-x-2">
          {editingReplyId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : editingReplyId ? 'Edit' : 'Submit Reply'}
          </button>
        </div>
      </form>

      {/* Modal for Image Preview */}
      {showModal && (
        <GalleryModal images={ticket.images} closeModal={closeModal} />
      )}
    </div>
  );
};
const GalleryModal = ({ images, closeModal }) => {
  // Prepare images array for react-image-gallery
  const galleryImages = images.map(image => ({
    original: `${process.env.REACT_APP_BASE_URL}/images/${image.filename}`,
    thumbnail: `${process.env.REACT_APP_BASE_URL}/images/${image.filename}`,
    originalAlt: image.filename,
    thumbnailAlt: image.filename
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative mx-auto max-w-3xl bg-white rounded-lg shadow-lg">
        {/* Modal content */}
        <div className="flex justify-end pt-4 pr-4">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 flex">
          <ImageGallery
            items={galleryImages}
            lazyLoad={true}
            showThumbnails={true}
            showFullscreenButton={false}
            showPlayButton={false}
            slideDuration={300}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleTicket;
