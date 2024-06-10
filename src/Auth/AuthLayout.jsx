import React, { createContext, useState, useEffect } from 'react';
import ApiUrl from '../config/ApiUrl';
import Toast from '../Alerts/Toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const cookies = new Cookies({ path: '/' });
  const [userToken , setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState();
  console.log(isAuthenticated);
  const Signup = async (data) => {
    setLoading(true);
    try {
      const res = await ApiUrl.post('/user/auth/signup', data);
      const authorizationHeader = res.headers['Authorization'];
      if (res.status === 200 || res.status === 201) {
        cookies.set('token', authorizationHeader, { path: '/' })
        setUserToken(authorizationHeader);
        setUser(data);
        setLoading(false);
        Toast('success', "User created successfully");
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        const message = res.data.message || "Signup failed";
        setLoading(false);
        Toast('error', message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const serverErrorMessage = error.response.data.message || error.response.data.validationErrors?.[0]?.message || "Signup failed";
        Toast('error', serverErrorMessage);
      } else if (error.message) {
        Toast('error', error.message);
      } else {
        Toast('error', "An unknown error occurred");
      }
    }
  };

  const Signin = async (data) => {
    setLoading(true);
    try {
      const res = await ApiUrl.post('/user/auth/signin', data);
      console.log(res);
      const authorizationHeader = res?.data?.token;
      console.log("Authorization header:", authorizationHeader);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        cookies.set('token', authorizationHeader, { path: '/' })
        setUserToken(authorizationHeader);
        setUser(res.data.user);
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
        Toast('success', "Login successful");
        navigate('/');
        console.log(authorizationHeader);
        setTimeout(() => {
          // window.location.reload();
        } , 2000);
      } else {
        const message = res.data.message || "Login failed";
        setLoading(false);
        Toast('error', message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const serverErrorMessage = error.response.data.message || error.response.data.validationErrors?.[0]?.message || "Login failed";
        Toast('error', serverErrorMessage);
      } else if (error.message) {
        Toast('error', error.message);
      } else {
        Toast('error', "An unknown error occurred");
      }
    }
  };

  const logout = () => {
    cookies.remove('token', { path: '/' });
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    Toast('success', "Logout successful");
    window.location.reload();
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") ? true : false);
  } , [isAuthenticated]);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    
    if (user) {
      localStorage.setItem('user', JSON.stringify({ id: user?.id, name: user?.name, email: user?.email , role : user?.role }));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, logout, loading, Signup, Signin , isAuthenticated , userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// make useAuth hook
export const useAuth = () => {
  return React.useContext(AuthContext);
};
