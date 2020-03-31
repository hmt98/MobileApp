const URL = 'https://misappmobile.000webhostapp.com/Dangnhap/dangnhap.php';

function getTokenEmail(Email, MatKhau) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      Email,
      MatKhau,
    }),
  }).then(response => response.json());
}

export default getTokenEmail;
