const register = (TenNguoiDung, SDT, Email, MatKhau) =>
  fetch('https://misappmobile.000webhostapp.com/Dangky/nhapsodienthoai.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({TenNguoiDung, SDT, Email, MatKhau}),
  }).then(response => response.json());

module.exports = register;
