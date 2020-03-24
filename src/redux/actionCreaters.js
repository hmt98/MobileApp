export function startFetchData() {
  return {type: 'START_FETCH'};
}

export function loginSuccess(username, password) {
  return {type: 'LOGIN_SUCCESS', username, password};
}

export function loginError() {
  return {type: 'LOGIN_ERROR'};
}
