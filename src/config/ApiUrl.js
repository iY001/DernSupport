import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

const ApiUrl = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: token ? { 'Authorization': token } : {},
});

export default ApiUrl;
