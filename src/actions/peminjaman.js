import api from './apiPeminjaman';

export const PEMINJAMAN_ACTION_TYPES = {
  CREATE: 'PEMINJAMAN_CREATE',
  UPDATE: 'PEMINJAMAN_UPDATE',
  DELETE: 'PEMINJAMAN_DELETE',
  FETCH_ALL: 'PEMINJAMAN_FETCH_ALL',
};

export const fetchPeminjaman = () => (dispatch) => {
  api
    .peminjamanApi()
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
  api
    .peminjamanApi()
    .create(id)
    .then((res) => {
      dispatch({ type: PEMINJAMAN_ACTION_TYPES.CREATE, payload: res.data });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const updatePeminjaman = (id, onSuccess) => (dispatch) => {
  api
    .peminjamanApi()
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
  api
    .peminjamanApi()
    .delete(id)
    .then((res) => {
      dispatch({ type: PEMINJAMAN_ACTION_TYPES.DELETE, payload: id });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
