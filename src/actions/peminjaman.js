import { peminjamanApi } from './api';

export const PEMINJAMAN_ACTION_TYPES = {
  LOADING: 'PEMINJAMAN_LOADING',
  CREATE: 'PEMINJAMAN_CREATE',
  UPDATE: 'PEMINJAMAN_UPDATE',
  DELETE: 'PEMINJAMAN_DELETE',
  FETCH_ALL: 'PEMINJAMAN_FETCH_ALL',
};

export const fetchPeminjaman = () => (dispatch) => {
  dispatch({
    type: PEMINJAMAN_ACTION_TYPES.LOADING,
  });
  peminjamanApi()
    .fetchall()
    .then((res) => {
      dispatch({
        type: PEMINJAMAN_ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createPeminjaman = (id, onSuccess) => (dispatch) => {
  peminjamanApi()
    .create(id)
    .then((res) => {
      dispatch({ type: PEMINJAMAN_ACTION_TYPES.CREATE, payload: res.data });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const updatePeminjaman = (id, onSuccess) => (dispatch) => {
  peminjamanApi()
    .update(id)
    .then((res) => {
      dispatch({
        type: PEMINJAMAN_ACTION_TYPES.UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const deletePeminjaman = (id, onSuccess) => (dispatch) => {
  peminjamanApi()
    .delete(id)
    .then((res) => {
      dispatch({ type: PEMINJAMAN_ACTION_TYPES.DELETE, payload: id });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
