import { BUKU_ACTION_TYPES } from '../actions/buku';

const initialState = {
  loading: false,
  list: [],
};

export const bukuRequest = (state = initialState, action = {}) => {
  switch (action.type) {
    case BUKU_ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case BUKU_ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
        loading: false,
      };
    case BUKU_ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case BUKU_ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id_buku === action.payload.id_buku ? action.payload : x
        ),
      };
    case BUKU_ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id_buku !== action.payload),
      };
    default:
      return state;
  }
};
