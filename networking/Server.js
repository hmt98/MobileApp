const apiBlog = 'https://apiofblog.000webhostapp.com/';
// 'https://misappmobile.000webhostapp.com/Tinhoatdong/tinhoatdong.php';
const apiNguoiDung =
  'https://misappmobile.000webhostapp.com/Bangxephang/bangxephang.php';

async function getBlogFromServer() {
  try {
    let respond = await fetch(apiBlog);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {}
}

async function getBXHFromServer() {
  try {
    let respond = await fetch(apiNguoiDung);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {}
}

export {getBlogFromServer};
export {getBXHFromServer};
