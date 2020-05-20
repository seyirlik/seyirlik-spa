import * as actions from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case actions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case actions.ERROR:
      return {
        ...state,
        error: action.message,
      };
    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}
