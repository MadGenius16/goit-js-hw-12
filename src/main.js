import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {getPhotos} from './js/pixabay-api';
import {showGallery} from './js/render-functions';

const form = document.querySelector('.form');
export const gallery = document.querySelector('.gallery');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loaderBox = document.querySelector('.loader');

function showLoader() {
  loaderBox.classList.remove('visually-hidden');
}

export function closeLoader() {
  loaderBox.classList.add('visually-hidden');
}
form.addEventListener('submit', event => {
  event.preventDefault();
  showLoader();
  gallery.innerHTML = '';
  const query = event.currentTarget.elements.inputname.value.trim();
  if (query !== '') {
    getPhotos(query)
      .then(res => {
        showGallery(res.hits);
        form.reset();
      })
      .catch(error =>
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
        })
      );
    form.reset();
  }
});