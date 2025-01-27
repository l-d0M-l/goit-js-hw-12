//imports from other files
import { querySearch } from './js/pixabay-api';
import { createMarkUp } from './js/render-functions';

//imports of libraries
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//get the elements from page
const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const showMoreBtn = document.querySelector('.js-show-more-btn');

//global variables for fetch
let page = 1;
let searchedQuery = '';

//the event of submited form
const onSearchFormSumbit = async event => {
  try {
    event.preventDefault();
    //grt + check the entered value
    searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
      iziToast.show({
        message: 'Input has to be filled!',
        color: 'red',
        position: 'bottomLeft',
      });
      return;
    }

    //show the loading sign
    loader.style.visibility = 'visible';

    //set page to 1 in case of changed input
    page = 1;

    //start the search of the query
    const { data } = await querySearch(searchedQuery, page);

    //check if the query is valid
    if (data.total === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'bottomLeft',
      });

      searchFormEl.reset();

      //clean the gallry, hide loader and button
      gallery.innerHTML = '';

      loader.style.visibility = 'hidden';
      showMoreBtn.classList.add('is-hidden');

      return;
    }

    //check if there are more images to show the "more" button
    if (data.totalHits > page * 15) {
      console.log('asas');
      showMoreBtn.classList.remove('is-hidden');
      showMoreBtn.addEventListener('click', onShowMoreClick);
    }

    //output the results to the page, refresh the input and lightbox
    const galleryTemplate = data.hits.map(el => createMarkUp(el)).join('');
    gallery.innerHTML = galleryTemplate;

    searchFormEl.reset();
    lightbox.refresh();

    loader.style.visibility = 'hidden';
  } catch (error) {
    //in case of any errors
    loader.style.visibility = 'hidden';
    console.log(error);
  }
};
searchFormEl.addEventListener('submit', onSearchFormSumbit);

//show the bigger version of a photo
let lightbox = new SimpleLightbox('.query-image-big', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const onShowMoreClick = async () => {
  try {
    //elements for scrolling the page
    const card = document.querySelector('.js-gallery-item');
    const sizeToScroll = card.getBoundingClientRect().height;

    window.scrollBy({
      top: sizeToScroll * 2,
      behavior: 'smooth',
    });
    //show loader, change page to next to show next images, hide button
    loader.style.visibility = 'visible';
    page++;
    showMoreBtn.classList.add('is-hidden');

    //getting another set of photos, adding to the page
    const { data } = await querySearch(searchedQuery, page);
    const galleryTemplate = data.hits.map(el => createMarkUp(el)).join('');
    gallery.insertAdjacentHTML('beforeend', galleryTemplate);

    loader.style.visibility = 'hidden';

    lightbox.refresh();

    //check if this is the last set of photos
    if (data.totalHits < page * 15) {
      showMoreBtn.classList.add('is-hidden');

      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
      showMoreBtn.removeEventListener('click', onShowMoreClick);

      return;
    }
    showMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    showMoreBtn.classList.add('is-hidden');
  }
};
