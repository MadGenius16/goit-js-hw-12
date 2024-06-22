export function getPhotos(query) {
  const BASE_URL = 'https://pixabay.com';
  const endPoint = '/api/';
  const params = new URLSearchParams({
    key: '44405455-dc304595c2bd7cb59ead2c04f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${endPoint}?${params}`;
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}