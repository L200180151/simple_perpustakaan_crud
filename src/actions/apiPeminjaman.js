import axios from 'axios';

const baseUrl = 'https://l200180151-perpustakaan-api.herokuapp.com/';

export default {
  peminjamanApi(url = baseUrl + 'peminjaman') {
    return {
      fetchall: () => axios.get(url),
      create: (id) => axios.post(`${url}/add?id=${id}`),
      update: (id) => axios.put(`${url}/update?id=${id}`),
      delete: (id) => axios.delete(`${url}/delete?id=${id}`),
    };
  },
};
