const URL = 'https://misappmobile.000webhostapp.com/Dangnhap/dangnhap.php';

function getToken(username, password) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SDT: username,
      Email: username,
      MatKhau: password,
    }),
  }).then(response => response.json());
}

export default getToken;
