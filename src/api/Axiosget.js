import Axios from '@/axios';

export default {
  getslidebar(params) {
    return Axios.get('/getsidebar', {
      params,
    });
  },
  getGoodlist(params) {
    return Axios.get('/getGoodsList', { params });
  },
  likeSerch(params) {
    return Axios.get('/likeSearch', {
      params,
    });
  },
  serch(params) {
    return Axios.get('/search', {
      params,
    });
  },
  getGoodsByIds(params) {
    console.log(params);
    return Axios.get('/getGoodsByIds',
      { params });
  },
};
