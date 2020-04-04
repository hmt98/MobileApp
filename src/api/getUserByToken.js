const URL = 'https://misappmobile.000webhostapp.com/checktokenapp.php?token=';

function getUserByToken(token) {
  return fetch(URL + token).then(res => res.json());
}

module.exports = getUserByToken;
