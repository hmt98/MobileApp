import {createStore} from 'redux';
const defaultStateLogin = {
  username: null,
  password: null,
  token: '',
  err: false,
};

const reducer = (state = defaultStateLogin, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {username: null, password: null, token: '', err: false};
    case 'LOGIN_SUCCESS':
      return {
        username: action.username,
        password: action.password,
        err: false,
        token: 'a',
      };
    case 'LOGIN_ERROR':
      return {
        username: null,
        password: null,
        err: true,
        token: '',
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
