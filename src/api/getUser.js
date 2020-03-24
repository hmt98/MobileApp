const URL = 'https://5e57414d4c695f001432fb16.mockapi.io/api/tblNguoiDung/6';

function getUser() {
  return fetch(URL).then(res => res.json());
}

export default getUser;
