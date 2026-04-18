import { useEffect } from 'react';
import {useLocation } from 'react-router-dom';

function ScrollToTopOnPageChange() {
  let location = useLocation();

  useEffect(() => {
    const unlisten = ()=> {
      window.scrollTo(0, 0);
    }
    
    return () => {
      unlisten();
    };
  }, [location , window.scrollX]);

  return null;
}

export default ScrollToTopOnPageChange;