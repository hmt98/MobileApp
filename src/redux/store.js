import {createStore} from 'redux';
const defaultStateLogin = {
  username: null,
  password: null,
  token: null,
  err: false,
};

const reducer = (state = defaultStateLogin, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {username: null, password: null, token: null, err: false};
    case 'LOGIN_SUCCESS':
      return {
        username: action.username,
        password: action.password,
        err: false,
        token: action.token,
      };
    case 'LOGIN_ERROR':
      return {
        username: null,
        password: null,
        err: true,
        token: null,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
