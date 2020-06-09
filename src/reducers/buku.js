import { ACTION_TYPES } from '../actions/buku';

const initialState = {
  list: [],
};

export const bukuRequest = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id_buku === action.payload.id_buku ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id_buku !== action.payload),
      };
    default:
      return state;
  }
};
