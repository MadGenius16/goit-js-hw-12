import { lightbox, closeLoader } from '../main';
import { refs } from '../main';

export function renderGallery(array) {
  if (array.length === 0) {
    closeLoader();
    iziToast.warning({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      color: 'red',
      position: 'topRight',
    });
    form.reset();
  } else {
    const showGalleryArr = array
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

    refs.gallery.insertAdjacentHTML('beforeend', showGalleryArr);

    lightbox.refresh();
  }
  closeLoader();
}
