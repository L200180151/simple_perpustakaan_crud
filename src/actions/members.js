import api from './api';

export const MEMBER_ACTION_TYPES = {
  CREATE: 'MEMBER_CREATE',
  UPDATE: 'MEMBER_UPDATE',
  DELETE: 'MEMBER_DELETE',
  FETCH_ALL: 'MEMBER_FETCH_ALL',
};

export const fetchMembers = () => (dispatch) => {
  api
    .perpustakaanApi('member')
    .fetchall()
    .then((res) => {
      dispatch({
        type: MEMBER_ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createMember = (data, onSuccess, onError) => (dispatch) => {
  api
    .perpustakaanApi('member')
    .create(data)
    .then((res) => {
      dispatch({ type: MEMBER_ACTION_TYPES.CREATE, payload: res.data });
      onSuccess();
    })
    .catch((err) => onError());
};

export const updateMember = (id, data, onSuccess, onError) => (dispatch) => {
  api
    .perpustakaanApi('member')
    .update(id, data)
    .then((res) => {
      dispatch({
        type: MEMBER_ACTION_TYPES.UPDATE,
        payload: { id_member: id, ...data },
      });
      onSuccess();
    })
    .catch((err) => onError());
};

export const deleteMember = (id, onSuccess) => (dispatch) => {
  api
    .perpustakaanApi('member')
    .delete(id)
    .then((res) => {
      dispatch({ type: MEMBER_ACTION_TYPES.DELETE, payload: id });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
