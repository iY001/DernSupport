
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import PublicRouter from './Routing/PublicRouter';
import Toast from './Alerts/Toast';
import { useEffect } from 'react';
import  Cookies  from 'universal-cookie';
function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const navigate = useNavigate();
  const cookies = new Cookies();
  const location = useLocation();

  const token = cookies.get('token')
  useEffect(()=>{
    if(isAuthenticated){
      if(window.location.pathname === '/signin' || window.location.pathname === '/signup'){
        navigate('/home')
        Toast('error', 'Already Logged in')
      }
    }
  },[isAuthenticated , navigate])

  useEffect(() => {
    if (!token || token === undefined || token === null) {
      if(location.pathname.startsWith('/dashboard') || window.location.pathname === '/support'){        
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user'); 
      navigate('/signin');
    }

    }
    if (token) {
      localStorage.setItem('isAuthenticated', true);
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      
      <PublicRouter />


    </>
  );
}

export default App;
