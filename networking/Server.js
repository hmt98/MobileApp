const apiBlog =
  'https://misappmobile.000webhostapp.com/Tinhoatdong/tinhoatdong.php';

const apiBXH =
  'https://misappmobile.000webhostapp.com/Bangxephang/bangxephang.php';

const apiHoatDong =
  'https://misappmobile.000webhostapp.com/Hoatdong/hoatdong.php';

async function getBlogFromServer() {
  try {
    let respond = await fetch(apiBlog);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

async function getBXHFromServer() {
  try {
    let respond = await fetch(apiBXH);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

async function getHoatDongFromServer() {
  try {
    let respond = await fetch(apiHoatDong);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {
    console.log('Lỗi Mạng');
  }
}

export {getBlogFromServer};
export {getBXHFromServer};
export {getHoatDongFromServer};
