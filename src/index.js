import './sass/main.scss';
import fetchCountries from'./js/fetchCountries';
import templates from './templates/countries';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = {
  searchInp: document.querySelector('.js-input'),
  countries: document.querySelector('.js-countries'),
};

const debounce = require('lodash.debounce');

refs.searchInp.addEventListener('input', debounce(() => {
  const searchQuery = refs.searchInp.value;
  fetchCountries(searchQuery);
  clearMarkup();
}, 500));

function createMarkup(name) {
  if (!name.length) {
    error({
      title: 'Incorrect request!',
      text: 'Check if the country name is entered correctly',
      styling: 'brighttheme',
      delay: 500,
    });
    return clearMarkup();
  } else if (name.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `We found ${name.length} countries. Please enter a more specific query!`,
      styling: 'brighttheme',
      delay: 500,
    });
    return clearMarkup();
  } else if (name.length >= 2 && name.length <= 10) {
  return refs.countries.insertAdjacentHTML('beforeend', name
      .map(e => {
        return `<li><h1>${e.name}</h1></li>`;
      })
      .join(''));
  }
  const markup = templates(name);
  refs.countries.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countries.innerHTML = '';
}

export default createMarkup;

