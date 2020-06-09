import { MEMBER_ACTION_TYPES } from '../actions/members';

const initialState = {
  list: [],
};

export const membersRequest = (state = initialState, action = {}) => {
  switch (action.type) {
    case MEMBER_ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };
    case MEMBER_ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case MEMBER_ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id_member === action.payload.id_member ? action.payload : x
        ),
      };
    case MEMBER_ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id_member !== action.payload),
      };
    default:
      return state;
  }
};
