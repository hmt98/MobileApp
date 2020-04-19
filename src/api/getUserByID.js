const URL = 'https://misappmobile.000webhostapp.com/Thongtin/thongtin.php';

const getUserByID = idNguoiDung =>
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung}),
  }).then(response => response.json());

module.exports = getUserByID;
