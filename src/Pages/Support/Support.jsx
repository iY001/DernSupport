import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Toast from '../../Alerts/Toast';
import ApiUrl from '../../config/ApiUrl';
import Cookies from 'universal-cookie';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
    files: [], // Store an array of files
    type: '', // Add a type field
  });

  const [imagePreviews, setImagePreviews] = useState([]); // Store an array of image previews
  const [loading, setLoading] = useState(false); // Loading state

  const cookies = new Cookies();
  const token = cookies.get('token');

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
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      files: prevData.files.filter((_, index) => index !== indexToRemove),
    }));

    setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!token){
      Toast('error', 'Please Login First');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.type) {
      Toast('error', 'Please fill all the required fields');
      return;
    }

    if (!formData.email) {
      Toast('error', 'Please enter a valid email address');
      return;
    }

    setLoading(true); // Set loading state to true
    const data = new FormData();
    formData.files.forEach(file => data.append('files', file));
    data.append('fileName', formData.files[0]?.name.split('.').slice(0, -1).join('.'));
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('subject', formData.subject);
    data.append('description', formData.description);
    data.append('type', formData.type); // Append type to FormData

    try {
      const res = await ApiUrl.post('/tickets', data);
      const message = res.data.message;
      if (res.status === 200 || res.status === 201) {
        Toast('success', 'Form submitted successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          description: '',
          files: [],
          type: '', // Reset type field after successful submission
        });
        setImagePreviews([]);
      } else {
        Toast('error', message);
      }
    } catch (error) {
      console.error(error);
      Toast('error', error.response?.data?.error || error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const showLoadingToast = () => {
    Swal.fire({
      title: 'Loading...',
      html: '<div class="flex items-center justify-center text-center overflow-hidden" role="status"><svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg><span class="sr-only">Loading...</span></div>',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <section className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Submit a Ticket</h1>
        <p className="text-gray-600">Please fill out the form below to submit a ticket.</p>
      </section>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <Input type="text" name="name" label="Name" placeholder="Enter your name" value={formData.name} onChange={handleChange} helperText="(Required)" />
        <Input type="email" name="email" label="Email Address" placeholder="Enter your email address" value={formData.email} onChange={handleChange} helperText="(Required)" />
        <Input type="tel" name="phone" label="Phone Number" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} helperText="(Required)" />
        <div className="flex flex-col items-start">
          <label htmlFor="type" className="flex gap-1 text-sm font-medium text-gray-700 mb-2 mr-2">Type <span className="text-red-500">(Required)</span></label>
          <select name="type" id="type" value={formData.type} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500">
            <option value="" disabled>Select Type</option>
            <option value="Hardware" className='text-black hover:bg-primary bg-opacity-35'>Hardware</option>
            <option value="Software" className='text-black hover:bg-primary bg-opacity-35'>Software</option>
          </select>
        </div>

        <Input type="text" name="subject" label="Subject" placeholder="Enter the subject" value={formData.subject} onChange={handleChange} />
        <Textarea name="description" label="Description" placeholder="Enter your description" value={formData.description} onChange={handleChange} />
        <FileInput name="files" label="Attachments" onChange={handleChange} imagePreviews={imagePreviews} handleRemoveImage={handleRemoveImage} />
        <button
          type="submit"
          disabled={loading}
          onClick={showLoadingToast}
          className={`w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <div role="status"></div>'
    </div>
  );
}

const Input = ({ type, name, label, placeholder, value, onChange, helperText }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label} <span className="text-red-500">{helperText}</span>
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
    />
  </div>
);

const Textarea = ({ name, label, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      id={name}
      rows="5"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
    ></textarea>
  </div>
);

const FileInput = ({ name, label, onChange, imagePreviews, handleRemoveImage }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      name={name}
      id={name}
      accept="image/*"
      multiple // Allow multiple files selection
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
    />
    {imagePreviews.length > 0 && (
      <div className="mt-4 grid grid-cols-2 gap-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt="Preview" className="w-full h-auto rounded-lg mb-2" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleRemoveImage(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Support;
