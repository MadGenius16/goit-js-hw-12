
import axios from 'axios';

export async function getImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const endPoint = '/api/';
  const url = BASE_URL + endPoint;
  const params = {
    key: '44405455-dc304595c2bd7cb59ead2c04f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };
  const res = await axios.get(url, {params});
  return res.data;
}