import {createStore} from 'redux';
const defaultStateLogin = {
  username: null,
  password: null,
  isLoading: false,
  err: false,
};

const reducer = (state = defaultStateLogin, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {username: null, password: null, isLoading: true, err: false};
    case 'LOGIN_SUCCESS':
      return {
        username: action.username,
        password: action.password,
        err: false,
        isLoading: false,
      };
    case 'LOGIN_ERROR':
      return {
        username: null,
        password: null,
        err: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
