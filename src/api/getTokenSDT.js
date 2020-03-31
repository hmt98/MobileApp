const URL = 'https://misappmobile.000webhostapp.com/Dangnhap/dangnhap.php';

function getTokenSDT(SDT, MatKhau) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      SDT,
      MatKhau,
    }),
  }).then(response => response.json());
}

export default getTokenSDT;
