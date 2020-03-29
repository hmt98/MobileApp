const URL = 'https://misappmobile.000webhostapp.com/checktoken.php?token=';

function getUser(token) {
  return fetch(URL + token).then(res => res.json());
}

export default getUser;
