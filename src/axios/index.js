import Axios from 'axios';

const appkey = 'doublewei_1617275428444';
const instance = Axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
});

instance.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    appkey,
  },
}), (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
}, (error) => Promise.reject(error));

export default instance;
