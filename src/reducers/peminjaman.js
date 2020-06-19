import { PEMINJAMAN_ACTION_TYPES } from '../actions/peminjaman';

const initialState = {
  loading: false,
  list: [],
};

export const peminjamanRequest = (state = initialState, action = {}) => {
  switch (action.type) {
    case PEMINJAMAN_ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case PEMINJAMAN_ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
        loading: false,
      };
    case PEMINJAMAN_ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case PEMINJAMAN_ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id_peminjaman === action.payload.id_peminjaman ? action.payload : x
        ),
      };
    case PEMINJAMAN_ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id_peminjaman !== action.payload),
      };
    default:
      return state;
  }
};
