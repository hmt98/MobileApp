const insertQuyengop = (idNguoiDung, idHoatDong, SoTien) =>
  fetch('https://misappmobile.000webhostapp.com/Quyengop/themquyengop.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, idHoatDong, SoTien}),
  }).then(response => response.json());

module.exports = insertQuyengop;
