const URL = 'https://jwtdemo.000webhostapp.com';

function getUser(username, password) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      USERNAME: username,
      PASSWORD: password,
    }),
  }).then(response => response.json());
}

export default getUser;
