import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { renderGallery } from './js/render-functions';
import { getImages } from './js/pixabay-api';

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const refs = {
  gallery: document.querySelector('.gallery'),
  formEl: document.querySelector('.form'),
  searchBtn: document.querySelector('.search-btn'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loaderBox: document.querySelector('.loader'),
};

let query;
let currentPage = 1;
const pageSize = 15;
let maxPage = 0;

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function closeLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function showLoader() {
  refs.loaderBox.classList.remove('visually-hidden');
}

export function closeLoader() {
  refs.loaderBox.classList.add('visually-hidden');
}

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    iziToast.success({
      color: 'blue',
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
    closeLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}

function myScroll() {
  const height = refs.gallery.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  query = event.target.elements.inputname.value.trim();
  showLoader();
  currentPage = 1;
  if (query !== '') {
    try {
      const data = await getImages(query, currentPage);
      maxPage = Math.ceil(data.totalHits / pageSize);
      renderGallery(data.hits);
    } catch {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'topRight',
      });
    }
  } 
  
  event.target.reset();
  closeLoader();
  checkBtnStatus();
}

async function onLoadMoreClick() {
  currentPage += 1;
  closeLoadMoreBtn();
  showLoader();
  try {
    const data = await getImages(query, currentPage);
    renderGallery(data.hits);
  } catch {
    iziToast.show({
      message: 'Error',
      color: 'red',
      position: 'topRight',
    });
  }

  closeLoader();
  checkBtnStatus();
  myScroll();
}