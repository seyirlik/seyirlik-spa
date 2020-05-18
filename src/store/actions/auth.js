import jwt_decode from 'jwt-decode';
import { toggleModal } from '../reducers/modal';
export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';
export const REGISTER = 'REGISTER';
export const CLEAR_ERROR = 'CLEAR_ERROR';

//Login actions
export const loginRequest = (nick, password) => async (
  dispatch,
  getState,
  http
) => {
  return http
    .post('/auth/login', {
      nick,
      password,
    })
    .then((res) => {
      const { success, token } = res;
      if (success) {
        localStorage.setItem('token', token);
        const user = jwt_decode(token);
        dispatch(login(user));
        const {
          modal: { isActive },
        } = getState();
        if (isActive) {
          dispatch(toggleModal());
        }
      }
      return success;
    })
    .catch((err) => {
      dispatch(error(err.response.data.message));
      return false;
    });
};
export const login = (user) => {
  return { type: LOGIN, user };
};

//Register actions

export const registerRequest = (nick, email, password) => (
  dispatch,
  getState,
  http
) => {
  return http
    .post('/auth/register', {
      nick,
      email,
      password,
    })
    .then((res) => {
      return res.success;
    })
    .catch((err) => {
      dispatch(error(err.response.data.message));
      return false;
    });
};

export const error = (message) => ({
  type: ERROR,
  message,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
