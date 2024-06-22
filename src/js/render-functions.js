import { gallery, lightbox, closeLoader } from '../main';

export function showGallery(images) {
  if (images.length===0) {
    closeLoader();
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      color: 'red',
      position: 'topRight',
    });
    form.reset();
  } else {
    const markup = images
      .map(image => {
        return `<li class="gallery-item">
        <a href="${image.largeImageURL}">
        <img class="photo" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            Likes
            <p>${image.likes}</p>
          </li>
          <li class="info-list-item">
            Views
            <p>${image.views}</p>
          </li>
          <li class="info-list-item">
            Comments
            <p>${image.comments}</p>
          </li>
          <li class="info-list-item">
            Downloads
            <p>${image.downloads}</p>
          </li>
        </ul>
      </li>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }
  closeLoader();
}