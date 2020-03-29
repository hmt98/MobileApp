const register = (TenNguoiDung, SDT, Email, MatKhau) =>
  fetch('https://misappmobile.000webhostapp.com/Dangky/register.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({TenNguoiDung, SDT, Email, MatKhau}),
  }).then(res => res.text());

module.exports = register;
