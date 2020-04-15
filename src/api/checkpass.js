const checkpass = (Email, SDT) =>
  fetch('https://misappmobile.000webhostapp.com/Doimatkhau/kiemtrapass.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({Email, SDT}),
  }).then(response => response.json());

module.exports = checkpass;
