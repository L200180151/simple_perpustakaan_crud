import api from './api';

export const BUKU_ACTION_TYPES = {
  CREATE: 'BUKU_CREATE',
  UPDATE: 'BUKU_UPDATE',
  DELETE: 'BUKU_DELETE',
  FETCH_ALL: 'BUKU_FETCH_ALL',
};

export const fetchBuku = () => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .fetchall()
    .then((res) => {
      dispatch({
        type: BUKU_ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createBuku = (data, onSuccess, onError) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .create(data)
    .then((res) => {
      dispatch({ type: BUKU_ACTION_TYPES.CREATE, payload: res.data });
      onSuccess();
    })
    .catch((err) => onError());
};

export const updateBuku = (id, data, onSuccess, onError) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .update(id, data)
    .then((res) => {
      dispatch({
        type: BUKU_ACTION_TYPES.UPDATE,
        payload: { id_buku: id, ...data },
      });
      onSuccess();
    })
    .catch((err) => onError());
};

export const deleteBuku = (id, onSuccess) => (dispatch) => {
  api
    .perpustakaanApi('buku')
    .delete(id)
    .then((res) => {
      dispatch({ type: BUKU_ACTION_TYPES.DELETE, payload: id });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
