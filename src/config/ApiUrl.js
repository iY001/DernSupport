import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ApiUrl = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

ApiUrl.interceptors.request.use((config) => {
  const token = cookies.get('token');

  if (token) {
    config.headers = {
      Authorization: `${token}`,
    };
  }
  return config;
})
export default ApiUrl;
