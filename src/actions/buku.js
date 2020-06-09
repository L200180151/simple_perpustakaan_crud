import api from './api';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
};

export const fetchBuku = () => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .fetchall()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createBuku = (data, onSuccess) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .create(data)
    .then((res) => {
      dispatch({ type: ACTION_TYPES.CREATE, payload: res.data });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const updateBuku = (id, data, onSuccess) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id_member: id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const deleteBuku = (id, onSuccess) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .delete(id)
    .then((res) => {
      dispatch({ type: ACTION_TYPES.DELETE, payload: id });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
