const changepass = (idNguoiDung, MatKhau, NewPass) =>
  fetch('https://misappmobile.000webhostapp.com/Doimatkhau/doipass.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, MatKhau, NewPass}),
  }).then(response => response.json());

module.exports = changepass;
