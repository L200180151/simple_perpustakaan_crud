import { combineReducers } from 'redux';
import { membersRequest } from './members';
import { bukuRequest } from './buku';
import { peminjamanRequest } from './peminjaman';

export const reducers = combineReducers({
  membersRequest,
  bukuRequest,
  peminjamanRequest,
});
