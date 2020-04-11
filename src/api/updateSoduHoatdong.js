const updateSoduHoatdong = (idHoatDong, moi) =>
  fetch(
    'https://misappmobile.000webhostapp.com/Quyengop/updatesoduhoatdong.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        idHoatDong,
        moi,
      }),
    },
  ).then(response => response.json());

module.exports = updateSoduHoatdong;
