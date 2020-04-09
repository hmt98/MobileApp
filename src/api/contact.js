const contact = (idNguoiDung, NoiDung) =>
  fetch('https://misappmobile.000webhostapp.com/Gopy/gopyinsert.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung, NoiDung}),
  }).then(response => response.json());

module.exports = contact;
