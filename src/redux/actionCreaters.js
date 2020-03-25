export function startFetchData() {
  return {type: 'START_FETCH'};
}

export function loginSuccess(username, password, token) {
  return {type: 'LOGIN_SUCCESS', username, password, token};
}

export function loginError() {
  return {type: 'LOGIN_ERROR'};
}
