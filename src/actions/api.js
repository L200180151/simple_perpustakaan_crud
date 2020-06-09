import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

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
