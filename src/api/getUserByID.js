const URL =
  'https://misappmobile.000webhostapp.com/Thongtin/thongtin.php?idNguoiDung=';

function getUserByID(id) {
  return fetch(URL + id).then(res => res.json());
}

module.exports = getUserByID;
