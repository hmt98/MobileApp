const updateSoduNguoidung = (idNguoiDung, moi) =>
  fetch(
    'https://misappmobile.000webhostapp.com/Quyengop/updatesodunguoidung.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        idNguoiDung,
        moi,
      }),
    },
  ).then(response => response.json());

module.exports = updateSoduNguoidung;
