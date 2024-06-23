// import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {getPhotos} from './js/pixabay-api';
import {showGallery} from './js/render-functions';

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


  const form= document.querySelector('.form');
  const btnLoadMore= document.querySelector('.js-btn-load');
  export const gallery= document.querySelector('.gallery');
  const loaderBox= document.querySelector('.loader');
  const searchBtn= document.querySelector('.search-btn');


function showLoader() {
  loaderBox.classList.remove('visually-hidden');
}

export function closeLoader() {
  loaderBox.classList.add('visually-hidden');
}

function showLoadBtn() {
  btnLoadMore.classList.remove('.visually-hidden')
}
function closeLoadBtn() {
  btnLoadMore.classList.add('.visually-hidden')
}

let currentPage=1;
let query;
const perPage=15
let maxPage;

form.addEventListener('submit', async event => {
  event.preventDefault();
  showLoader();
  gallery.innerHTML = '';
  currentPage = 1;
   query = event.target.elements.inputname.value.trim();
  if (query !== '') {
    try{
      const data = await getPhotos(query, currentPage)
      maxPage = Math.ceil(data.totalHits / perPage);
      showGallery(data.hits);
      form.reset();
    }
      catch { iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
        })
      }
      closeLoader();
      showLoadBtn()
      // e.target.reset();
    }
  }
);
btnLoadMore.addEventListener("click", async()=>{
currentPage++;
showLoader()
showLoadBtn()
try {
  const data = await getPhotos(query, currentPage)
  const markup = showGallery(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup)
} catch {
  console.log('error');
}
closeLoader()
updateBtnStatus()
})

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    closeLoadBtn();

    if (maxPage) {
      iziToast.info({
        title: 'The End!',
        message: 'End of collection!',
      });
    }
  } else {
    showLoadBtn();
  }
}