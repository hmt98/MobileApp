const updateInfor = (
  idNguoiDung,
  TenNguoiDung,
  MatKhau,
  SDT,
  Email,
  NgaySinh,
  STK,
) =>
  fetch('https://misappmobile.000webhostapp.com/Doithongtin/update.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      idNguoiDung,
      TenNguoiDung,
      MatKhau,
      SDT,
      Email,
      NgaySinh,
      STK,
    }),
  }).then(response => response.json());

module.exports = updateInfor;
