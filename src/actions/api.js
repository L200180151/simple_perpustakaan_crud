import axios from 'axios';

const baseUrl = 'https://l200180151-perpustakaan-api.herokuapp.com/';

export default {
  perpustakaanApi(endpoint) {
    const url = baseUrl + endpoint;
    return {
      fetchall: () => axios.get(url),
      create: (newRecord) => axios.post(`${url}/add`, newRecord),
      update: (id, updateRecord) =>
        axios.put(`${url}/update?id=${id}`, updateRecord),
      delete: (id) => axios.delete(`${url}/delete?id=${id}`),
    };
  },
};
