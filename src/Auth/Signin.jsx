import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthLayout';
import Toast from '../Alerts/Toast';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function Signin() {
  const [formData, setFormData] = useState({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const { Signin } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Signin(formData);
    } catch (error) {
      Toast('error', error.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Sign In</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>
        <div className="mb-6">
          <InputComponent label="Email" name="email" formData={formData} setFormData={setFormData} placeholder="Enter your email" />
        </div>
        <div className="mb-6">
          <InputComponent label="Password" name="password" formData={formData} setFormData={setFormData} placeholder="Enter your password" show={true} />
        </div>
        <div className="flex flex-col items-center mb-6">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Sign In
          </button>
        </div>
        <div className="text-center">
          <Link to="/signup" className="text-blue-600 hover:underline">Create an Account</Link>
        </div>
      </form>
    </div>
  );
}

const InputComponent = ({ label, name, formData, setFormData, placeholder, show = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        type={show && !showPassword ? "password" : "text"}
        className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      {show && (
        <span
          className="absolute right-4 top-10 text-gray-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      )}
    </div>
  );
};

export default Signin;
