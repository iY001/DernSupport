import axios from 'axios';
import  Cookies  from 'universal-cookie';

const cookies = new Cookies();


const ApiUrl = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Authorization': `${cookies.get('token')}`,
  }
})


export default ApiUrl;